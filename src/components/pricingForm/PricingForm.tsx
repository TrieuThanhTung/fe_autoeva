import "./PricingForm.scss";
import React, { useState, useEffect } from "react";
import ImagePricingCar from "../../assets/images/car-valuation.jpg";
import { FaCalculator } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Interface định nghĩa cấu trúc dữ liệu trả về từ API
interface Brand {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
}

interface Version {
  id: number;
  name: string;
  info: string;
}

// Hàm gọi API để lấy các hãng xe
const fetchBrands = async (): Promise<Brand[]> => {
  const response = await fetch("https://spec.autoeva.io.vn/api/brands");
  return response.json();
};

// Hàm gọi API để lấy mẫu xe theo hãng
const fetchModels = async (brandId: string): Promise<Model[]> => {
  const response = await fetch(`https://spec.autoeva.io.vn/api/models?brand_id=${brandId}`);
  return response.json();
};

// Hàm gọi API để lấy phiên bản xe theo mẫu
const fetchVersions = async (modelId: string): Promise<Version[]> => {
  const response = await fetch(`https://spec.autoeva.io.vn/api/versions?model_id=${modelId}`);
  return response.json();
};

const PricingForm: React.FC = () => {
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [version, setVersion] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [km, setKm] = useState<string>("");

  const [brands, setBrands] = useState<Brand[]>([]); // Danh sách hãng xe
  const [models, setModels] = useState<Model[]>([]); // Danh sách mẫu xe
  const [versions, setVersions] = useState<Version[]>([]); // Danh sách phiên bản xe

  const navigate = useNavigate(); // Hook điều hướng

  // Lấy danh sách các hãng xe khi component mount
  useEffect(() => {
    const getBrands = async () => {
      const brandsData = await fetchBrands();
      setBrands(brandsData);
    };
    getBrands();
  }, []);

  // Lấy mẫu xe khi chọn hãng
  useEffect(() => {
    if (brand) {
      const getModels = async () => {
        const modelsData = await fetchModels(brand);
        setModels(modelsData);
        setModel(""); // Reset mẫu xe khi thay đổi hãng
        setVersion(""); // Reset phiên bản khi thay đổi mẫu xe
      };
      getModels();
    } else {
      setModels([]);
      setModel("");
      setVersions([]);
      setVersion("");
    }
  }, [brand]);

  // Lấy phiên bản khi chọn mẫu xe
  useEffect(() => {
    if (model) {
      const getVersions = async () => {
        const versionsData = await fetchVersions(model);
        setVersions(versionsData);
      };
      getVersions();
    } else {
      setVersions([]);
      setVersion("");
    }
  }, [model]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(e.target.value);
    setModel("");
    setVersion("");
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
    setVersion("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Gửi dữ liệu qua URL query params
    const queryParams = new URLSearchParams({
      brand,
      model,
      version,
      year,
      km,
    });

    // Điều hướng tới trang /predict và truyền query params
    navigate(`/predict?${queryParams.toString()}`);
  };

  return (
    <section className="container-pricing-form">
      <div className="wrapper-pricing-form">
        <h2>Định Giá Xe Thông Minh</h2>
        <p className="des">
          AI phân tích dữ liệu để đưa ra giá xe chính xác nhất theo thị trường.
          Chỉ cần nhập một số thông tin cơ bản
        </p>
        <form className="form-pricing" onSubmit={handleSubmit}>
          <select className="input-form" value={brand} onChange={handleBrandChange}>
            <option value="">Chọn hãng xe</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <select className="input-form" value={model} onChange={handleModelChange} disabled={!brand}>
            <option value="">Chọn mẫu xe</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <select className="input-form" value={version} onChange={(e) => setVersion(e.target.value)} disabled={!model}>
            <option value="">Chọn phiên bản</option>
            {versions.map((v) => (
              <option key={v.id} value={v.id}>{v.info ? v.info.split("/")[0] : v.name}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Năm sản xuất"
            className="input-form"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <input
            type="number"
            placeholder="Số km đã đi"
            className="input-form"
            value={km}
            onChange={(e) => setKm(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            <FaCalculator className="icon" />
            <span>Định giá ngay</span>
          </button>
        </form>
      </div>

      <div className="pricing-form-image">
        <img src={ImagePricingCar} alt="AI Pricing" className="rounded-md" />
      </div>
    </section>
  );
};

export default PricingForm;