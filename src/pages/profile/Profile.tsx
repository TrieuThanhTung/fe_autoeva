import React, { useState, useRef } from "react";
import "./profile.scss";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    dob: "1990-01-01",
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100); // Tránh lỗi focus khi component chưa cập nhật xong
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Dữ liệu đã lưu:", formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-section">
            <img
              src="https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g"
              alt="Avatar"
              className="avatar"
            />
            <button className="edit-avatar">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <h1 className="profile-name">{formData.name}</h1>
        </div>

        <div className="profile-content">
          <div className="profile-fields">
            <div className="profile-row">
              <div className="profile-field">
                <label>Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  ref={nameInputRef} // Gán ref để auto-focus khi chỉnh sửa
                />
              </div>
              <div className="profile-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="profile-field">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="profile-footer">
          <div className="button-group">
            {isEditing ? (
              <button className="save-btn" onClick={handleSave}>
                <i className="fas fa-save"></i> Lưu
              </button>
            ) : (
              <button className="edit-btn" onClick={handleEditClick}>
                <i className="fas fa-edit"></i> Chỉnh sửa thông tin
              </button>
            )}
            <button className="change-password-btn">
              <i className="fas fa-key"></i> Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
