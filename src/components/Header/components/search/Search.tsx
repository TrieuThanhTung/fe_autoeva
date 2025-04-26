import React, { useState, useEffect, useRef } from "react";
import styles from "./Search.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { PostItemType } from "../../../../util/type";
import PostApi from "../../../../api/PostApi";
import { formatCurrency } from "../../../../util/utils";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<PostItemType[]>([]);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPostByQuery = async (query: string) => {
    try {
      const res = await PostApi.search(query)
      if (res.status === 200) {
        setFilteredResults(res.data.sale_posts)
      } else {
        setFilteredResults([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout( async () => {
      if (value.trim() === "") {
        setFilteredResults([]);
      } else {
        await fetchPostByQuery(value.trim())
      }
    }, 500);
  };

  useEffect(() => {
    setFilteredResults([])
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [location.pathname, id]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setFilteredResults([])
      navigate(`/posts?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <SearchOutlinedIcon className={styles.icon} />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {filteredResults.length > 0 && (
        <ul className={styles.resultList}>
          {filteredResults.map((item) => (
            <Link to={`/post/${item.id}`}>
              <li key={item.id} className={styles.resultItem}>
              <img src={item.image} alt={item.title} className={styles.thumb} />
              <div className={styles.info}>
                <p className={styles.name}>{item.title}</p>
                <div className={styles.priceBox}>
                  <span className={styles.price}>
                    {formatCurrency(Number(item.price))}₫
                  </span>
                </div>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
