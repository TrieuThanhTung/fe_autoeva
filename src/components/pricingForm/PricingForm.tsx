import "./PricingForm.scss"
import React, { useState } from "react";
import ImagePrcingCar from "../../assets/images/car-valuation.jpg";

const carModels: { [key: string]: string[] } = {
  Toyota: ["Camry", "Corolla", "Fortuner"],
  Mercedes: ["C200", "C300", "GLC"],
};

const PricingForm: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState("");

  return (
    <section className="container-pricing-form">
      <div className="pricing-form">
        <h2 className="">Định Giá Xe Thông Minh</h2>
        <p className="des">
          Công nghệ AI phân tích hàng triệu dữ liệu để đưa ra giá xe chính xác nhất theo thị trường.
          Chỉ cần nhập một số thông tin cơ bản
        </p>
        <form className="">
          <select 
            className="input-form" 
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Chọn hãng xe</option>
            <option value="Toyota">Toyota</option>
            <option value="Mercedes">Mercedes</option>
          </select>
          <select className="input-form" disabled={!selectedBrand}>
            <option>Chọn mẫu xe</option>
            {selectedBrand && carModels[selectedBrand]?.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
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
