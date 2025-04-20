/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./UserPostPage.module.scss";
import PostItem from "../../../components/userPosts/postItem/UserPostItem";
import Pagination from "@mui/material/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalLoading } from "../../../context/components/globalLoading/GlobalLoadingProvider";
import { PostItemType } from "../../../util/type";
import UserApi from "../../../api/UserApi";
import { toast } from "react-toastify";

const UserPostPage: React.FC = () => {
  const {showLoading, hideLoading} = useGlobalLoading();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  const initialCurrentPage = queryParams.get("page") || "";

  const [userPosts, setUserPosts] = React.useState<Array<PostItemType>>([]);
  const [currentPage, setCurrentPage] = React.useState(initialCurrentPage ? parseInt(initialCurrentPage) : 1);
  const [totalPages, setTotalPages] = React.useState(1);

  const fetchUserPosts = async (page?: number) => {
    showLoading();
    try {
      const response = await UserApi.getPosts(page);
      if (response.status === 200) {
        const data = response.data;
        setUserPosts(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.total_pages);
      } else {
        toast.error("Lỗi khi tải bài đăng");
      }
    } catch (error) {
      toast.error("Lỗi khi tải bài đăng");
      console.error(error);
    } finally {
      setTimeout(() => {
        hideLoading();
      }, 500);
    }
  };

  React.useEffect(() => {
    fetchUserPosts(currentPage);
  }, [currentPage]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    navigate(`/my-posts?page=${value}`);
  };

  const handleRemovePost = (postId: number) => {
    setUserPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Danh Sách Bài Đăng</span>
        <Link to = "/my-posts/create" ><button className={styles.createButton}>Tạo Bài Đăng Mới</button></Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerName}>Xe</th>
            <th className={styles.headerPrice}>Giá</th>
            <th className={styles.headerStatus}>Trạng Thái</th>
            <th className={styles.headerCreatedAt}>Ngày Đăng</th>
            <th className={styles.headerAction}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {userPosts.length !== 0 ? userPosts.map((post) => (
            <PostItem key={post.id} post={post} handleRemovePost={handleRemovePost} />
          )) : <tr><td colSpan={5}>Không có bài đăng nào</td></tr>}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className={styles.containerPagination}>
          <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default UserPostPage;
