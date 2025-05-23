/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./CreatePostPage.module.scss";
import ImageUpload from "../../../components/uploadImage/UploadImage";
import CKEditor from "../../../components/Editor/Editor";
import { formatCurrency, parseCurrency, uploadAllImages } from "../../../util/utils";
import { Brand, CreatePostType, Model, Version } from "../../../util/type";
import { toast } from 'react-toastify';
import CarInfoApi from "../../../api/CarInfoApi";
import { useGlobalLoading } from "../../../context/components/globalLoading/GlobalLoadingProvider";
import PostApi from "../../../api/PostApi";
import { useNavigate } from "react-router-dom";

type formDataType = {
  brand: number;        
  model: number;        
  version: number;      
  year: number | string;         
  mileage: number | string;      
  price: number | string;        
  location: string;     
  images: File[];      
};

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<formDataType>({
    brand: -1,
    model: -1,
    version: -1,
    year: "",
    mileage: "",
    price: "",
    location: "",
    images: [] as File[],
  });

  const {showLoading, hideLoading} = useGlobalLoading();
  const [description, setDescription] = useState<string>("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const [brands, setBrands] = useState<Brand[]>();
  const [models, setModels] = useState<Model[]>();
  const [versions, setVersions] = useState<Version[]>();

  useEffect(() => {
    
    const fetchBrands = async () => {
      try {
        const response = await CarInfoApi.getBrands();
        if (response.status === 200) {
          setBrands(response.data); 
        } else {
          toast.error("Lỗi khi tải dữ liệu hãng xe");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (form.brand === -1) return;
      try {
        const response = await CarInfoApi.getModels(form.brand);
        if (response.status === 200) {
          setModels(response.data); 
        } else {
          toast.error("Lỗi khi tải dữ liệu mẫu xe");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchModels();
  }, [form.brand]);

  useEffect(() => {
    const fetchVersions = async () => {
      if (form.model === -1) return;
      try {
        const response = await CarInfoApi.getVersions(form.model);
        if (response.status === 200) {
          setVersions(response.data); 
        } else {
          toast.error("Lỗi khi tải dữ liệu phiên bản xe");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchVersions();
  }, [form.model]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseCurrency(e.target.value);
    setForm({ ...form, price: rawValue });
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseCurrency(e.target.value);
    setForm({ ...form, mileage: rawValue });
  };

  const handleDesChange = (newContent: string) => {
    setDescription(newContent);
  };

  const handleImageUpload = (files: File[]) => {
    setForm((prevForm) => ({
      ...prevForm,
      images: [...(prevForm.images || []), ...files],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setForm((prevForm) => {
      return {
      ...prevForm,
      images: form.images.filter((_, i) => i !== index),
      }
    });
    setPreviewImages((prevImages) => {
      return prevImages.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async (images: File[]) => {
    if (!images || images.length === 0) {
      toast.error("Vui lòng chọn hình ảnh để tải lên");
      return;
    }
    return await uploadAllImages(images)
  };



  const verifyForm = () => {
    if (form.brand === -1) {
      toast.error("Vui lòng chọn hãng xe");
      return false;
    }
    if (form.model === -1) {
      toast.error("Vui lòng chọn mẫu xe");
      return false;
    }
    if (form.version === -1) {
      toast.error("Vui lòng chọn phiên bản xe");
      return false;
    }
    if (Number(form.year) <= 1900 || Number(form.year) > new Date().getFullYear()) {
      toast.error("Vui lòng nhập năm sản xuất hợp lệ");
      return false;
    }
    if (Number(form.mileage) <= 1 || Number(form.mileage) > 10000000) {
      toast.error("Vui lòng nhập số km đã đi hợp lệ");
      return false;
    }
    if (form.price === '' || Number(form.price) <= 10000000 || Number(form.price) > 100000000000) {
      toast.error("Vui lòng nhập giá bán, tối thiểu 10 triệu, tối đa 100 tỷ");
      return false;
    }
    if (form.location.trim() === "") {
      toast.error("Vui lòng nhập địa chỉ");
      return false;
    }
    if (description.trim() === "") {
      toast.error("Vui lòng nhập mô tả chi tiết");
      return false;
    }
    if (form.images.length === 0 && form.images.length <= 10) {
      toast.error("Vui lòng tải lên hình ảnh, tối đa 10 hình ảnh");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    showLoading();

    if (!verifyForm()) {
      hideLoading();
      return;
    }
    try {
      const imageUrls = await handleUpload(form.images);
      if (!imageUrls) {
        toast.error("Lỗi khi tải lên hình ảnh");
        return;
      }
      const formData = {
        brand_id: form.brand as number,
        model_id: form.model as number,
        version_id: form.version as number,
        description: description,
        year: form.year as number,
        price: form.price as number,
        location: form.location,
        odo: form.mileage as number,
        images: imageUrls
      }
      const response = await PostApi.createPost(formData as CreatePostType);
      if (response.status === 201) {
        setTimeout(() => {
          toast.success("Đăng bài thành công");
          navigate("/my-posts");
        }, 1000);
      } else {
        setTimeout(() => { toast.error("Đã có lỗi xảy ra trong quá trình đăng bài"); }, 1000);
      } 
    } catch (error) {
      console.error(error);
      setTimeout(() => { toast.error("Đã có lỗi xảy ra trong quá trình đăng bài"); }, 1000);
    } finally { 
      setTimeout(() => {
        hideLoading();
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tạo Bài Đăng Mới</h2>
      <form>
        <div className={styles.rowGroupedThree}>
          <div className={styles.row}>
            <label>Hãng xe</label>
            <select name="brand" onChange={handleChange} value={form.brand}>
             <option value="" className={styles.defaultSelectText}>Chọn hãng xe</option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <label>Mẫu xe</label>
            <select name="model" onChange={handleChange} value={form.model} disabled={form.brand === -1}>
              <option value="" className={styles.defaultSelectText}>Chọn mẫu xe</option>
              {models?.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <label>Phiên bản</label>
            <select name="version" onChange={handleChange} value={form.version} disabled={form.model === -1}>
              <option value="" className={styles.defaultSelectText}>Chọn phiên bản</option>
              {versions?.map((version) => (
                <option key={version.id} value={version.id}>
                  {version.info}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.rowGrouped}>
          <div className={styles.row}>
            <label>Năm sản xuất</label>
            <input
              type="number"
              name="year"
              placeholder="Nhập năm sản xuất"
              onChange={handleChange}
              value={form.year}
              required
            />
          </div>

          <div className={styles.row}>
            <label>Số km đã đi</label>
            <input
              type="text"
              name="mileage"
              placeholder="Nhập số km"
              onChange={handleMileageChange}
              value={form.mileage ? formatCurrency(form.mileage) : ""}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <label>Giá bán</label>
          <input
            type="text"
            name="price"
            placeholder="Nhập giá bán (VND)"
            onChange={handlePriceChange}
            value={form.price ? formatCurrency(form.price) : ""}
            required
          />
        </div>

        <div className={styles.row}>
          <label>Vị trí</label>
          <input
            type="text"
            name="location"
            placeholder="Nhập địa chỉ"
            onChange={handleChange}
            value={form.location}
            required
          />
        </div>

        <div className={styles.row}>
          <label>Mô tả chi tiết</label>
          <CKEditor handleEditorChange={handleDesChange}/>
        </div>

        <div className={styles.imageUpload}>
          <label>Hình ảnh</label>
          <ImageUpload onUpload={handleImageUpload} previewImages={previewImages} setPreviewImages={setPreviewImages} handleRemoveImage={handleRemoveImage}/>
        </div>

        <div className={styles.containerBtn}>
          <button className={styles.btnSubmit} type="button" onClick={handleSubmit}>
            Đăng bài
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
