/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../../api/AuthApi";
import { delay } from "../../util/delay";
import { useGlobalLoading } from "../../context/components/globalLoading/GlobalLoadingProvider";
import { vietnameseNameRegex } from "../../util/regex";

const Signup = () => {
  const { showLoading, hideLoading } = useGlobalLoading();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    setErrors({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    if (!vietnameseNameRegex.test(formData.fullName)) {
      setErrors((prev) => ({
        ...prev,
        fullName: "Tên không hợp lệ",
      }));
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Email không hợp lệ",
      }));
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Số điện thoại không hợp lệ",
      }));
      return false;
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số",
      }));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu không khớp",
      }));
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!validateForm()) {
      return;
    }
    showLoading();
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        first_name: formData.fullName.split(" ")[0],
        last_name: formData.fullName.split(" ").slice(1).join(" "),
        phone_number: formData.phone,
      };
      const res = await AuthApi.register(payload);
      if (res.status === 200) {
        delay(() => {navigate("/signup-success")}, 1000);
      } else {
        if (res.data.errors.full_messages.includes("Email has already been taken")) {
          setErrors((prev) => ({
            ...prev,
            email: "Email đã tồn tại",
          }));
        }
        if (res.data.errors.full_messages.includes("Phone number has already been taken")) {
          setErrors((prev) => ({
            ...prev,
            phone: "Phone đã tồn tại",
          }));
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      hideLoading();
    }
  };

  return (
    <main className="signup">
      <div className="form-container">
        <h1>Đăng ký</h1>
        <form onSubmit={handleSubmit}>
          <div className={`input-group ${errors.fullName ? 'error' : ''}`}>
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              placeholder="Nhập họ và tên"
              onChange={handleChange}
              required
            />
            <p className={`error-message ${errors.fullName ? 'show' : ''}`}>{errors.fullName}</p>
          </div>
          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập Email"
              onChange={handleChange}
              required
            />
            <p className={`error-message ${errors.email ? 'show' : ''}`}>{errors.email}</p>
          </div>
          <div className={`input-group ${errors.phone ? 'error' : ''}`}>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              onChange={handleChange}
              required
            />
            <p className={`error-message ${errors.phone ? 'show' : ''}`}>{errors.phone}</p>
          </div>
          <div className={`input-group ${errors.password ? 'error' : ''}`}>
            <label>Mật khẩu</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="toggle-password"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            <p className={`error-message ${errors.password ? 'show' : ''}`}>{errors.password}</p>
          </div>
          <div className={`input-group ${errors.confirmPassword ? 'error' : ''}`}>
            <label>Xác nhận mật khẩu</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="toggle-password"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            <p className={`error-message ${errors.confirmPassword ? 'show' : ''}`}>{errors.confirmPassword}</p>
          </div>
          <button type="submit">Đăng ký</button>
          <p className="login-link">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Signup;
