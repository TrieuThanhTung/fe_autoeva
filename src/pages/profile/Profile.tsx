import React, { useState, useRef, useEffect } from "react";
import "./profile.scss";
import UserApi from "../../api/UserApi";
import { AuthHeaders } from "../../util/type";
import { toast } from "react-toastify";
import ProfileCard from "../../components/userProfile/profileCard";
import ChangePasswordCard from "../../components/userProfile/changePasswordCard";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [originalFormData, setOriginalFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const headers: AuthHeaders = {
        "access-token": localStorage.getItem("access-token") || "",
        uid: localStorage.getItem("uid") || "",
        client: localStorage.getItem("client") || "",
      };

      try {
        const res = await UserApi.getProfile(headers);
        const user = res.data.user;
        const newData = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone_number || "",
          dob: user.dob || "",
        };
        setFormData(newData);
        setOriginalFormData(newData);
        setUserId(user.id);
      } catch (err) {
        toast.error("Không thể tải thông tin người dùng");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    let isValid = true;
    setPasswordErrors({ currentPassword: "", newPassword: "", confirmPassword: "" });

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordData.newPassword)) {
      setPasswordErrors((prev) => ({
        ...prev,
        newPassword: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số",
      }));
      isValid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu không khớp",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!userId) return;

    const headers: AuthHeaders = {
      "access-token": localStorage.getItem("access-token") || "",
      uid: localStorage.getItem("uid") || "",
      client: localStorage.getItem("client") || "",
    };

    const nameParts = formData.name.trim().split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" ");

    try {
      await UserApi.updateUserById(
        userId,
        {
          first_name,
          last_name,
          phone_number: formData.phone,
          role: undefined,
        },
        headers
      );
      toast.success("Cập nhật thông tin thành công!");
      setOriginalFormData(formData);
      setIsEditing(false);
    } catch (err) {
      toast.error("Cập nhật thất bại!");
      console.error(err);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;
  
    const headers: AuthHeaders = {
      "access-token": localStorage.getItem("access-token") || "",
      uid: localStorage.getItem("uid") || "",
      client: localStorage.getItem("client") || "",
    };
  
    try {
      const res = await UserApi.changePassword(
        {
          current_password: passwordData.currentPassword,
          password: passwordData.newPassword,
          password_confirmation: passwordData.confirmPassword,
        },
        headers
      );
  
      if (res.status === 200 && !res.data?.error && !res.data?.errors) {
        toast.success("Đổi mật khẩu thành công!");
        setShowChangePassword(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordErrors({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const newErrors = {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        };
  
        if (typeof res.data?.error === "string") {
          newErrors.currentPassword = res.data.error;
        }
  
        if (typeof res.data?.errors === "object") {
          for (const key in res.data.errors) {
            const message = res.data.errors[key].join(", ");
            if (key === "current_password") newErrors.currentPassword = message;
            if (key === "password") newErrors.newPassword = message;
            if (key === "password_confirmation") newErrors.confirmPassword = message;
          }
        }
  
        setPasswordErrors(newErrors);
      }
    } catch (err: any) {
      const resData = err?.response?.data;
  
      const newErrors = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
  
      if (typeof resData?.error === "string") {
        newErrors.currentPassword = resData.error;
      }
  
      if (typeof resData?.errors === "object") {
        for (const key in resData.errors) {
          const message = resData.errors[key].join(", ");
          if (key === "current_password") newErrors.currentPassword = message;
          if (key === "password") newErrors.newPassword = message;
          if (key === "password_confirmation") newErrors.confirmPassword = message;
        }
      }
  
      setPasswordErrors(newErrors);
      console.error("Lỗi đổi mật khẩu:", resData);
    }
  };
  

  const handleCancelEdit = () => {
    setFormData(originalFormData);
    setIsEditing(false);
  };

  const handleCancelPasswordChange = () => {
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordErrors({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowChangePassword(false);
  };

  return (
    <div className="profile-container">
      {showChangePassword ? (
        <>
          <ChangePasswordCard
            currentPassword={passwordData.currentPassword}
            newPassword={passwordData.newPassword}
            confirmPassword={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            errors={passwordErrors}
          />
          <div className="profile-footer">
            <div className="button-group">
              <button className="save-btn" onClick={handleChangePassword}>
                <i className="fas fa-save"></i> Đổi mật khẩu
              </button>
              <button className="change-password-btn" onClick={handleCancelPasswordChange}>
                <i className="fas fa-times"></i> Huỷ
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProfileCard
            name={formData.name}
            email={formData.email}
            phone={formData.phone}
            dob={formData.dob}
            isEditing={isEditing}
            onChange={handleChange}
            onEditClick={handleEditClick}
            onSaveClick={handleSave}
            nameRef={nameInputRef}
          />
          <div className="profile-footer">
            <div className="button-group">
              {isEditing ? (
                <>
                  <button className="save-btn" onClick={handleSave}>
                    <i className="fas fa-save"></i> Lưu
                  </button>
                  <button className="change-password-btn" onClick={handleCancelEdit}>
                    <i className="fas fa-times"></i> Huỷ
                  </button>
                </>
              ) : (
                <>
                  <button className="edit-btn" onClick={handleEditClick}>
                    <i className="fas fa-edit"></i> Đổi thông tin
                  </button>
                  <button className="change-password-btn" onClick={() => setShowChangePassword(true)}>
                    <i className="fas fa-key"></i> Đổi mật khẩu
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
