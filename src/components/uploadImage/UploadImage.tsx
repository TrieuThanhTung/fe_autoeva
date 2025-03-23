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
      setPreviewImages(imageUrls);
      onUpload(acceptedFiles);
    },
  });

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
          {previewImages.map((src, index) => (
            <img key={index} src={src} alt={`preview-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
