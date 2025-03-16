import "./PricingForm.scss"
import React from "react";
import ImagePrcingCar from "../../assets/images/pricing-car.jpg";


const PricingForm: React.FC = () => {
  return (
    <section className="container-pricing-form">
      <div className="pricing-form">
        <h2 className="">Định Giá Xe Thông Minh</h2>
        <p className="des">
          Công nghệ AI phân tích hàng triệu dữ liệu để đưa ra giá xe chính xác nhất theo thị trường.
          Chỉ cần nhập một số thông tin cơ bản
        </p>
        <form className="mt-4 space-y-4">
          <select className="input-form">
            <option>Chọn hãng xe</option>
            <option>Toyota</option>
            <option>Mercedes</option>
          </select>
          <input type="number" placeholder="Năm sản xuất" className="input-form" />
          <input type="number" placeholder="Số km đã đi" className="input-form" />
          <button className="bg-black text-white px-4 py-2 rounded-md">Định giá ngay</button>
        </form>
      </div>
      <div className="pricing-form-image">
        <img src={ImagePrcingCar} alt="AI Pricing" className="rounded-md" />
      </div>
    </section>
  );
};

export default PricingForm;
