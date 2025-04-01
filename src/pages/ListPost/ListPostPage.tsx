import React from "react";
import styles from "./ListPostPage.module.scss";
import CarList from "../../components/car/CarList";

const ListPostPage: React.FC = () => {
  return (
    <div className={styles.container}>
    <div className={styles.filterContainer}>
      <div className={styles.filterRow}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Hãng xe</label>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Vị trí</label>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Mức giá</label>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Năm sản xuất</label>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>
      </div>
      <div className={styles.filterRow}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Tên xe</label>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Kiểu dáng</label>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Nhiên liệu</label>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Số chỗ ngồi</label>
          <select className={styles.filterSelect}>
            <option>Tất cả</option>
          </select>
        </div>
      </div>
    </div>

    <div className={styles.sortContainer}>
        <select className={styles.sortSelect}>
          <option>Mới nhất</option>
          <option>Thời gian</option>
        </select>
      </div>

    <div className={styles.listContainer}>
      <CarList />
    </div>
  </div>
  );
};

export default ListPostPage;
