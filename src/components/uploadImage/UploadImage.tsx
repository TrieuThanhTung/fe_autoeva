import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import styles from "./UploadImage.module.scss";

type ImageUploadProps = {
  onUpload: (files: File[]) => void;
  previewImages?: string[];
  setPreviewImages?: React.Dispatch<React.SetStateAction<string[]>>;
  handleRemoveImage: (index: number) => void;
};

const ImageUpload = ({ onUpload, previewImages, setPreviewImages, handleRemoveImage }: ImageUploadProps) => {

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/gif': [],
      'image/svg+xml': [],
      'image/avif': [],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages?.((prevImages) => [...prevImages, ...imageUrls]);
      onUpload(acceptedFiles);
    },
  });

  const removeImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    handleRemoveImage(id);
  };

  return (
    <div className={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={styles.uploadBox}>
        <CloudUpload size={40} color="#888" />
        <p>Kéo thả hình ảnh vào đây hoặc click để chọn file</p>
        <small>Hỗ trợ định dạng: JPG, PNG. Tối đa 10 ảnh.</small>
      </div>
      {(previewImages as string[]).length > 0 && (
        <div className={styles.preview}>
          {(previewImages as string[]).map((img, index) => (
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
