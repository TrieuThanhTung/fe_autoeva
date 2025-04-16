import { useState } from "react";
import styles from "./CreatePostPage.module.scss";
import ImageUpload from "../../../components/uploadImage/UploadImage";
import CKEditor from "../../../components/Editor/Editor";
import PostApi from "../../../api/PostApi";

async function uploadAllImages(images: File[]): Promise<(string | null)[]> {
  const uploadPromises = images.map((image) => {
    return PostApi.uploadImageToImgur(image);
  });

  const results = await Promise.all(uploadPromises);
  return results;
}

const CreatePostPage = () => {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    location: "",
    description: "",
    images: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDesChange = (newContent: string) => {
    setForm({ ...form, description: newContent });
  };

  const handleImageUpload = (files: File[]) => {
    setForm({ ...form, images: files });
  };

  const handleUpload = async (images: File[]) => {
    if (!images || images.length === 0) return;

    return await uploadAllImages(images)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrls = await handleUpload(form.images);
    

    console.log(imageUrls);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tạo Bài Đăng Mới</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.rowGrouped}>
          <div className={styles.row}>
            <label>Hãng xe</label>
            <select name="brand" onChange={handleChange} value={form.brand}>
              <option value="">Chọn hãng xe</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
            </select>
          </div>

          <div className={styles.row}>
            <label>Mẫu xe</label>
            <select name="model" onChange={handleChange} value={form.model}>
              <option value="">Chọn mẫu xe</option>
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
              type="number"
              name="mileage"
              placeholder="Nhập số km"
              onChange={handleChange}
              value={form.mileage}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <label>Giá bán</label>
          <input
            type="number"
            name="price"
            placeholder="Nhập giá bán (VND)"
            onChange={handleChange}
            value={form.price}
            required
          />
        </div>

        <div className={styles.row}>
          <label>Vị trí</label>
          <select name="location" onChange={handleChange} value={form.location}>
            <option value="">Chọn tỉnh/thành phố</option>
          </select>
        </div>

        <div className={styles.row}>
          <label>Mô tả chi tiết</label>
          <CKEditor handleEditorChange={handleDesChange}/>
        </div>

        <div className={styles.imageUpload}>
          <label>Hình ảnh</label>
          <ImageUpload onUpload={handleImageUpload} />
        </div>

        <div className={styles.containerBtn}>
          <button className={styles.btnSubmit} type="submit">
            Đăng bài
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
