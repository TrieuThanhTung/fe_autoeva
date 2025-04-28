/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "./predict.scss";
import { useLocation } from "react-router-dom";
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import {Brand, Model, Version} from "../../util/type"
import CarInfoApi from "../../api/CarInfoApi"

const Predict: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialBrand = queryParams.get("brand") || "";
  const initialModel = queryParams.get("model") || "";
  const initialVersion = queryParams.get("version") || "";
  const initialYear = queryParams.get("year") || "";
  const initialKm = queryParams.get("km") || "";

  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [selectedModel, setSelectedModel] = useState<string>(initialModel);
  const [selectedVersion, setSelectedVersion] = useState<string>(initialVersion);
  const [year, setYear] = useState<string>(initialYear);
  const [kmDriven, setKmDriven] = useState<string>(initialKm);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);

  const [showResult, setShowResult] = useState<boolean>(false);
  const [predictedPrice, setPredictedPrice] = useState<string | null>(null); // Giá dự đoán là string
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [predictedCarName, setPredictedCarName] = useState<string>("");
  const [predictedYear, setPredictedYear] = useState<number | null>(null);
  const [predictedMileage, setPredictedMileage] = useState<number | null>(null);

  // Lưu tên của hãng, mẫu và phiên bản đã chọn
  const [selectedBrandName, setSelectedBrandName] = useState<string>("");
  const [selectedModelName, setSelectedModelName] = useState<string>("");
  const [selectedVersionInfo, setSelectedVersionInfo] = useState<string>("");

  // Lấy danh sách các hãng xe khi component mount
  useEffect(() => {
    const getBrands = async () => {
      try {
        const brandsData = await CarInfoApi.fetchBrands();
        setBrands(brandsData);
      } catch (error: any) {
        console.error("Error fetching brands:", error);
        // Optionally set an error state to display to the user
      }
    };
    getBrands();
  }, []);

  // Lấy mẫu xe khi chọn hãng hoặc khi có brandId từ query params
  useEffect(() => {
    if (selectedBrand) {
      const getModels = async () => {
        try {
          const modelsData = await CarInfoApi.fetchModels(parseInt(selectedBrand));
          setModels(modelsData);
          if (!initialModel) {
            setSelectedModel("");
          }
          if (!initialVersion) {
            setSelectedVersion("");
          }
        } catch (error: any) {
          console.error("Error fetching models:", error);
          setModels([]);
          setSelectedModel("");
          setSelectedVersion("");
        }
      };
      getModels();

      // Cập nhật tên hãng xe khi chọn hoặc từ query params
      const selectedBrandObj = brands.find(brand => brand.id.toString() === selectedBrand);
      setSelectedBrandName(selectedBrandObj ? selectedBrandObj.name : "");
    } else {
      setModels([]);
      setSelectedModel("");
      setSelectedBrandName("");
      setVersions([]);
      setSelectedVersion("");
      setSelectedVersionInfo("");
    }
  }, [selectedBrand, brands, initialModel, initialVersion]);

  // Lấy phiên bản khi chọn mẫu xe hoặc khi có modelId từ query params
  useEffect(() => {
    if (selectedModel) {
      const getVersions = async () => {
        try {
          const versionsData = await CarInfoApi.fetchVersions(parseInt(selectedModel));
          setVersions(versionsData);
          if (!initialVersion) {
            setSelectedVersion("");
          }
        } catch (error: any) {
          console.error("Error fetching versions:", error);
          setVersions([]);
          setSelectedVersion("");
        }
      };
      getVersions();

      // Cập nhật tên mẫu xe khi chọn hoặc từ query params
      const selectedModelObj = models.find(model => model.id.toString() === selectedModel);
      setSelectedModelName(selectedModelObj ? selectedModelObj.name : "");
    } else {
      setVersions([]);
      setSelectedVersion("");
      setSelectedModelName("");
      setSelectedVersionInfo("");
    }
  }, [selectedModel, models, initialVersion]);

  // Lấy thông tin phiên bản khi chọn hoặc từ query params
  useEffect(() => {
    if (selectedVersion) {
      const selectedVersionObj = versions.find(version => version.id.toString() === selectedVersion);
      setSelectedVersionInfo(selectedVersionObj ? selectedVersionObj.info.split("/")[0] : "");
    } else {
      setSelectedVersionInfo("");
    }
  }, [selectedVersion, versions]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel("");
    setSelectedVersion("");
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    setSelectedVersion("");
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleKmDrivenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKmDriven(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPredictedPrice(null);
    setPredictionError(null);
    setShowResult(false);
    setPredictedCarName("");
    setPredictedYear(null);
    setPredictedMileage(null);

    if (!selectedBrand || !selectedModel || !selectedVersion || !year || !kmDriven) {
      setPredictionError("Vui lòng điền đầy đủ thông tin.");
      setShowResult(true);
      return;
    }

    try {
      const predictionData = await CarInfoApi.fetchPrediction(
        parseInt(selectedBrand),
        parseInt(selectedModel),
        parseInt(selectedVersion),
        parseInt(year),
        parseInt(kmDriven)
      );
      setPredictedPrice(predictionData.body.predicted_price);
      setPredictedCarName(predictionData.body.car_name);
      setPredictedYear(predictionData.body.year_of_manufacture);
      setPredictedMileage(predictionData.body.mileage);
      setShowResult(true);
    } catch (error: any) {
      console.error("Error predicting price:", error);
      setPredictionError(error.message || "Đã có lỗi xảy ra khi dự đoán giá.");
      setShowResult(true);
    }
  };

  return (
    <main className="predict-page">
      <div className="container">
        <h1 className="title">Định Giá Xe</h1>
        <form className="predict-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Hãng xe</label>
            <select value={selectedBrand} onChange={handleBrandChange}>
              <option value="">Chọn hãng xe</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Mẫu xe</label>
            <select
              value={selectedModel}
              onChange={handleModelChange}
              disabled={!selectedBrand}
            >
              <option value="">Chọn mẫu xe</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Phiên bản</label>
            <select
              value={selectedVersion}
              onChange={handleVersionChange}
              disabled={!selectedModel}
            >
              <option value="">Chọn phiên bản</option>
              {versions.map((ver) => (
                <option key={ver.id} value={ver.id}>
                  {ver.info.split("/")[0]} {/* Hiển thị phần trước dấu "/" */}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Năm sản xuất</label>
            <input
              type="number"
              placeholder="VD: 2020"
              value={year}
              onChange={handleYearChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Số Km đã đi</label>
            <input
              type="number"
              placeholder="VD: 50000"
              value={kmDriven}
              onChange={handleKmDrivenChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            <CalculateRoundedIcon className="icon"/>
            Định giá ngay
          </button>
        </form>

        <div className="note">
          <h3>Lưu ý:</h3>
          <ul>
            <li>
              Kết quả định giá chỉ mang tính chất tham khảo, giá trị thực tế có thể dao động 2 - 10%, phụ thuộc vào tình trạng thực tế như:
              <ul>
                <li> Mức độ hao mòn nội và ngoại thất.</li>
                <li> Lịch sử sửa chữa, bảo dưỡng định kỳ.</li>
                <li> Số lần tai nạn hoặc thay thế phụ tùng.</li>
                <li> Số lượng chủ sở hữu trước đó.</li>
                <li> Thị trường mua bán xe cũ tại khu vực.</li>
              </ul>
            </li>
            <li>
              Những khoản <strong>phạt chưa xử lí</strong> có thể ảnh hưởng đến giá trị xe khi bán.
              <br />
              Hãy kiểm tra để đảm bảo không có vấn đề nào khi giao dịch mua bán xe.
            </li>
          </ul>
          <button
            className="fine-check-btn"
            onClick={() => window.open("https://phatnguoi.com/", "_blank")}
          >
            Tra cứu phạt nguội
          </button>
        </div>
      </div>

      {showResult && (predictedPrice !== null || predictionError !== null) && (
        <div className="predict-modal">
          <div className="modal-content">
            <h2>Thông tin xe của bạn</h2>

            <div className="info-table">
              {predictedCarName && (
                <div className="row">
                  <span className="label">Tên xe</span>
                  <span className="value">{predictedCarName}</span>
                </div>
              )}
              <div className="row">
                <span className="label">Hãng xe</span>
                <span className="value">{selectedBrandName}</span>
              </div>
              <div className="row">
                <span className="label">Dòng xe</span>
                <span className="value">{selectedModelName}</span>
              </div>
              <div className="row">
                <span className="label">Phiên bản</span>
                <span className="value">{selectedVersionInfo}</span>
              </div>
              <div className="row">
                <span className="label">Năm sản xuất</span>
                <span className="value">{predictedYear !== null ? predictedYear : year}</span>
              </div>
              <div className="row">
                <span className="label">Công tơ mét</span>
                <span className="value">
                  {predictedMileage !== null ? predictedMileage.toLocaleString() : parseInt(kmDriven).toLocaleString()} km
                </span>
              </div>
            </div>

            {predictedPrice !== null ? (
              <div className="price">
                Giá dự đoán:{" "}
                <span className="value">{predictedPrice}</span>
              </div>
            ) : (
              predictionError && <div className="error-message">{predictionError}</div>
            )}

            <button onClick={() => setShowResult(false)}>Đóng</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Predict;
