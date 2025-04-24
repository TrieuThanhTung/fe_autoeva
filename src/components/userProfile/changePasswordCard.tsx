// File: components/ChangePasswordCard.tsx

import React from "react";
import styles from "./profileCard.module.scss";

interface ChangePasswordCardProps {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    onTogglePassword: () => void;
    errors: {
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
    };
}

const ChangePasswordCard: React.FC<ChangePasswordCardProps> = ({
    currentPassword,
    newPassword,
    confirmPassword,
    onChange,
    showPassword,
    onTogglePassword,
    errors,
}) => {
    return (
        <div className={styles["profile-card"]}>
            <div className={styles["profile-content"]}>
                <div className={styles["profile-fields"]}>
                    <div className={`${styles["input-group"]} ${errors.currentPassword ? styles.error : ""}`}>
                        <label>Mật khẩu hiện tại</label>
                        <div className={styles["password-wrapper"]}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="currentPassword"
                                value={currentPassword}
                                onChange={onChange}
                                placeholder="Nhập mật khẩu hiện tại"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className={styles["toggle-password"]}
                            >
                                {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className={styles["error-message"]}>{errors.currentPassword}</p>
                        )}
                    </div>

                    <div className={`${styles["input-group"]} ${errors.newPassword ? styles.error : ""}`}>
                        <label>Mật khẩu mới</label>
                        <div className={styles["password-wrapper"]}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={newPassword}
                                onChange={onChange}
                                placeholder="Nhập mật khẩu mới"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className={styles["toggle-password"]}
                            >
                                {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className={styles["error-message"]}>{errors.newPassword}</p>
                        )}
                    </div>

                    <div className={`${styles["input-group"]} ${errors.confirmPassword ? styles.error : ""}`}>
                        <label>Xác nhận mật khẩu</label>
                        <div className={styles["password-wrapper"]}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                placeholder="Xác nhận mật khẩu mới"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className={styles["toggle-password"]}
                            >
                                {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className={styles["error-message"]}>{errors.confirmPassword}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordCard;
