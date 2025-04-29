// DropdownMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import styles from './DropdownMenu.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";

const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div
      className={styles.wrapper}
      ref={dropdownRef}
      onMouseLeave={() => setOpen(false)} 
    >
      <div className={styles.item} onClick={() => setOpen(prev => !prev)}>
        <FormatListBulletedIcon />
      </div>
      {open && (
        <div className={styles.dropdown}>
          <button onClick={() => handleNavigate('/my-posts')} className={styles.buttonItem}>
            <FaRegRectangleList size={24} className={styles.icon}/>
            Quản lý bài đăng
          </button>
          <button onClick={() => handleNavigate('/history-predictions')}>
            <FaHistory size={24} className={styles.icon} />
            Lịch sử định giá
          </button>
          <div className={styles.arrow} />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
