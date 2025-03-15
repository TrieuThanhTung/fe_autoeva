import "./footer.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <img src="logo_autoeva.svg" alt="Logo" className="footer__logo" />
            <p>Nền tảng mua bán xe cũ uy tín với công nghệ định giá AI thông minh.</p>
          </div>
          <div className="footer__section">
            <h4>Về chúng tôi</h4>
            <ul>
              <li><a href="#">Giới thiệu</a></li>
              <li><a href="#">Tuyển dụng</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><a href="#">Trung tâm hỗ trợ</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Kết nối</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2025 AutoEva. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;