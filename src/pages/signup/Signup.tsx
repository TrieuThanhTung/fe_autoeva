import { useState } from "react";
// import Header from "../../components/Header/AuthHeader/AuthHeader";
// import Footer from "../../components/Footer/Footer";
import "./signup.scss";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="signup">
        <div className="form-container">
          <h1>Đăng ký</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              onChange={handleChange}
              required
            />
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
