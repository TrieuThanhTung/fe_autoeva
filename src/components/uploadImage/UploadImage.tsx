import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import styles from "./UploadImage.module.scss";

const ImageUpload = ({ onUpload }: { onUpload: (files: File[]) => void }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: true,
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));

      setPreviewImages((prevImages) => [...prevImages, ...imageUrls]);

      onUpload(acceptedFiles);
    },
  });

  const removeImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.stopPropagation();
    setPreviewImages((prevImages) => prevImages.filter((_img, index) => index !== id));
  };

  return (
    <div className={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={styles.uploadBox}>
        <CloudUpload size={40} color="#888" />
        <p>Kéo thả hình ảnh vào đây hoặc click để chọn file</p>
        <small>Hỗ trợ định dạng: JPG, PNG. Tối đa 10 ảnh.</small>
      </div>
      {previewImages.length > 0 && (
        <div className={styles.preview}>
          {previewImages.map((img, index) => (
            <div key={index} className={styles.imageContainer}>
              <img src={img} alt={`preview-${index}`} className={styles.previewImage} />
              <button className={styles.removeButton} onClick={(event) => removeImage(event, index)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
