
import React from "react";
import styles from "./ProfileCard.module.scss";

interface ProfileCardProps {
  name: string;
  email: string;
  phone: string;
  dob: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onSaveClick: () => void;
  nameRef: React.RefObject<HTMLInputElement | null>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  phone,
  dob,
  isEditing,
  onChange,
  nameRef,
}) => {
  return (
    <div className={styles["profile-card"]}>
      <div className={styles["profile-header"]}>
        <div className={styles["avatar-section"]}>
          <img
            src="https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g"
            alt="Avatar"
            className={styles.avatar}
          />
          <button className={styles["edit-avatar"]}>
            <i className="fas fa-camera"></i>
          </button>
        </div>
        <h1 className={styles["profile-name"]}>{name}</h1>
      </div>

      <div className={styles["profile-content"]}>
        <div className={styles["profile-fields"]}>
          <div className={styles["profile-row"]}>
            <div className={styles["profile-field"]}>
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                disabled={!isEditing}
                ref={nameRef}
              />
            </div>
            <div className={styles["profile-field"]}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                disabled
              />
            </div>
          </div>
          <div className={styles["profile-row"]}>
            <div className={styles["profile-field"]}>
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={onChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles["profile-field"]}>
              <label>Ngày sinh</label>
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={onChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
