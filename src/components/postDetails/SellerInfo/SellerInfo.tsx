import React from "react";
import styles from "./SellerInfo.module.scss";
import { FaPhoneAlt } from "react-icons/fa";
import OptionsMenu from "../../optionsMenu/OptionsMenu";


interface SellerInfoProps {
  id?: string | number;
  name: string;
  avatar: string;
  joinYear: string;
  phone: string;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ name, avatar, joinYear, phone }) => {
  return (
    <div className={styles.sellerCard}>
      <div className={styles.sellerCardHeader}>
        <div className={styles.sellerInfo}>
          <img src={avatar} alt={name} className={styles.avatar} />
          <div>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.joinDate}>Thành viên từ {joinYear}</p>
          </div>
        </div>
        <button className={styles.reportBtn}>
          <OptionsMenu onReport={() => console.log("Report clicked")} />
        </button>
      </div>
      <button className={styles.phoneButton}>
        <FaPhoneAlt className={styles.phoneIcon} />
        {phone}
      </button>
    </div>
  );
};

export default SellerInfo;
