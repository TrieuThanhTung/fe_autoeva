import React, { useEffect, useState } from 'react';
import styles from './PredictionHistoryPage.module.scss';
import Pagination from '@mui/material/Pagination';
import { useGlobalLoading } from '../../context/components/globalLoading/GlobalLoadingProvider';
import { delay } from '../../util/delay';
import UserApi from '../../api/UserApi';
import { toast } from 'react-toastify';

interface Prediction {
  id: number;
  car_name: string;
  created_at: string;
  prediction_price: string;
}

const PredictionHistoryPage: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const {showLoading, hideLoading} = useGlobalLoading();

  const fetchData = async (page: number) => {
    showLoading();
    try {
      const res = await UserApi.getPredictionHistory(page);
      if (res.status !== 200) {
        delay(() => {
          toast.error("Lỗi khi tải lịch sử định giá");
        });
        return;
      }
      setPredictions(res.data.prediction_history);
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      delay(() => {hideLoading();})
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Lịch Sử Định Giá Xe</span>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCarName}>Tên Xe</th>
            <th className={styles.headerDate}>Ngày Định Giá</th>
            <th className={styles.headerPrice}>Giá Dự Đoán</th>
          </tr>
        </thead>
        <tbody>
          {predictions?.length !== 0 ? (
            predictions?.map((prediction) => (
              <tr key={prediction.id}>
                <td>{prediction.car_name}</td>
                <td>{new Date(prediction.created_at).toLocaleDateString('vi-VN')}</td>
                <td>{prediction.prediction_price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Không có dữ liệu định giá</td>
            </tr>
          )}
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

export default PredictionHistoryPage;
