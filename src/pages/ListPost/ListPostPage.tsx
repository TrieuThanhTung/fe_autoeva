/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styles from "./ListPostPage.module.scss";
import CarList from "../../components/car/CarList";
import { Brand, Model, PostItemType, SearchParams, Version } from "../../util/type";
import CarInfoApi from "../../api/CarInfoApi";
import { toast } from "react-toastify";
import { kmRangeValues, priceRangeValues, years } from "../../util/data";
import PostApi from "../../api/PostApi";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useGlobalLoading } from "../../context/components/globalLoading/GlobalLoadingProvider";

const ListPostPage: React.FC = () => {
  const { showLoading, hideLoading } = useGlobalLoading()
  const [brands, setBrands] = useState<Brand[]>();
  const [models, setModels] = useState<Model[]>();
  const [versions, setVersions] = useState<Version[]>();

  const navigate = useNavigate();
  const location = useLocation();

  const [salePosts, setSalePosts] = useState<PostItemType[]>()

  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    sort: "year_desc",
  });

  const [searchUrlParams, setSearchUrlParams] = useSearchParams()

  const query = searchUrlParams.get("query") || "";
  const brand_id = searchUrlParams.get("brand_id") || "";
  const model_id = searchUrlParams.get("model_id") || "";
  const version_id = searchUrlParams.get("version_id") || "";
  const year = searchUrlParams.get("year") || ""
  const odo_min = searchUrlParams.get("odo_min") || "";
  const odo_max = searchUrlParams.get("odo_max") || "";
  const price_min = searchUrlParams.get("price_min") || "";
  const price_max = searchUrlParams.get("price_max") || "";
  const sort = searchUrlParams.get("sort") || "";
  const page = Number(searchUrlParams.get("page") || "1");

  const updateParams = (newParams: Partial<SearchParams>) => {
    const updated = {
      query,
      brand_id,
      model_id,
      version_id,
      year,
      odo_min,
      odo_max,
      price_min,
      price_max,
      sort,
      page,
      ...newParams,
    };


    Object.keys(updated).forEach(
      (key) =>
        (updated as any)[key] === undefined ||
          (updated as any)[key] === "" ||
          (updated as any)[key] === null ? delete (updated as any)[key] : null
    );

    setSearchUrlParams(updated as any);
  };

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchSalePosts = async () => {
    showLoading()
    try {
      const params: SearchParams = {
        query,
        brand_id: brand_id || undefined,
        model_id: model_id || undefined,
        version_id: version_id || undefined,
        year: year || undefined,
        odo_min: odo_min || undefined,
        odo_max: odo_max || undefined,
        price_min: price_min || undefined,
        price_max: price_max || undefined,
        sort,
        page,
      };
      const res = await PostApi.getPostLists(params)
      if (res.status === 200) {
        setSalePosts(res.data.sale_posts)
        setCurrentPage(res.data.current_page)
        setTotalPages(res.data.total_pages)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        hideLoading()
      }, 1000)
    }
  }

  useEffect(() => {
    fetchSalePosts()

    const fetchBrands = async () => {
      try {
        const response = await CarInfoApi.getBrands();
        if (response.status === 200) {
          setBrands(response.data);
        } else {
          toast.error("Lỗi khi tải dữ liệu hãng xe");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, [searchUrlParams]);

  useEffect(() => {
    const fetchModels = async () => {
      if (!searchParams.brand_id || searchParams?.brand_id === -1) return;
      try {
        const response = await CarInfoApi.getModels(Number(searchParams.brand_id));
        if (response.status === 200) {
          setModels(response.data);
        } else {
          toast.error("Lỗi khi tải dữ liệu mẫu xe");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchModels();
  }, [searchParams.brand_id]);

  useEffect(() => {
    const fetchVersions = async () => {
      if (!searchParams.model_id || searchParams.model_id === -1) return;
      try {
        const response = await CarInfoApi.getVersions(Number(searchParams.model_id));
        if (response.status === 200) {
          setVersions(response.data);
        } else {
          toast.error("Lỗi khi tải dữ liệu phiên bản xe");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchVersions();
  }, [searchParams.model_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchParams((prevSP) => ({ ...prevSP, [e.target.name]: e.target.value }));
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("sort", e.target.value);
    newParams.set("page", "1");
    navigate(`${location.pathname}?${newParams.toString()}`);
  }

  const handleChangeRangeOdo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const odoRange = kmRangeValues[Number(e.target.value)]
    setSearchParams((prevSP) => ({
      ...prevSP,
      odo_min: odoRange.value.min,
      odo_max: odoRange.value.max
    }))
  }

  const handleChangeRangePrice = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const priceRange = priceRangeValues[Number(e.target.value)]
    setSearchParams((prevSP) => ({
      ...prevSP,
      price_min: priceRange.value.min,
      price_max: priceRange.value.max
    }))
  }

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    setSearchParams((prevSP) => ({
      ...prevSP,
      page: value
    }))
    updateParams({ page: value })
  };

  const handleSubmit = async () => {
    updateParams(searchParams)
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Hãng xe</label>
            <select name="brand_id" className={styles.filterSelect} onChange={handleChange}>
              <option value="" className={styles.defaultSelectText}>Chọn hãng xe</option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Mẫu xe</label>
            <select name="model_id" className={styles.filterSelect} onChange={handleChange}>
              <option value="" className={styles.defaultSelectText}>Chọn mẫu xe</option>
              {models?.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Phiên bản</label>
            <select name="version_id" className={styles.filterSelect} onChange={handleChange}>
              <option value="" className={styles.defaultSelectText}>Chọn phiên bản</option>
              {versions?.map((version) => (
                <option key={version.id} value={version.id}>
                  {version.info}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Năm sản xuất</label>
            <select name="year" className={styles.filterSelect} onChange={handleChange}>
              <option value="">Tất cả</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Số km</label>
            <select name="odo" className={styles.filterSelect} onChange={handleChangeRangeOdo}>
              <option value=""> Tất cả </option>
              {kmRangeValues.map((range, idx) => (
                <option key={idx} value={idx}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Mức giá</label>
            <select name="price" className={styles.filterSelect} onChange={handleChangeRangePrice}>
              <option value=""> Tất cả </option>
              {priceRangeValues.map((range, idx) => (
                <option key={idx} value={idx}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.sortContainer}>
        <select name="sort" className={styles.sortSelect} onChange={handleChangeSort}>
          <option value={'year_desc'}>Mới nhất</option>
          <option value={'year_asc'} >Cũ nhất</option>
          <option value={'price_asc'}>Giá tăng dần </option>
          <option value={'price_desc'}>Giá giảm dần </option>
        </select>
        <button className={styles.buttonApply} onClick={handleSubmit}>Áp dụng</button>
      </div>

      <div className={styles.listContainer}>
        {salePosts && salePosts?.length > 0 ? <CarList salePosts={salePosts} setSalePosts={setSalePosts} />
          : <h3>Không có kết quả nào phù hợp.</h3>
        }
      </div>

      {totalPages > 1 && (
        <div className='' style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
          <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
        </div>
      )}
    </div>
  );
};

export default ListPostPage;
