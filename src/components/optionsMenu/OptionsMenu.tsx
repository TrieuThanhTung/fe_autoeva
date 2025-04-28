/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import styles from "./OptionsMenu.module.scss";
import { FiFlag } from "react-icons/fi";
import ImageUpload from "../uploadImage/UploadImage";
import { uploadAllImages } from "../../util/utils";
import UserApi from "../../api/UserApi";
import { toast } from "react-toastify";
import { delay } from "../../util/delay";
import { useGlobalLoading } from "../../context/components/globalLoading/GlobalLoadingProvider";


interface OptionsMenuProps {
  reportId?: number |  string;
  titleReport?: string;
  reportableType?: 'User' | 'SalePost';
}

export default function OptionsMenu({ reportId, titleReport, reportableType }: OptionsMenuProps) {
  const {showLoading, hideLoading} = useGlobalLoading();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setOpen(prev => !prev);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleReportClick = () => {
    setOpen(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReportContent("");
  };

  const [form, setForm] = useState({
    images: [] as File[],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

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

  const handleUploadImages = async (images: File[]) => {
    if (images.length === 0) {
      return [];
    }
    return await uploadAllImages(images)
  }

  const handleSubmitReport = async () => {
    showLoading();
    const imageUrls = await handleUploadImages(form.images);

    const reportPayload = {
      report: {
        reason: reportContent,
        reportable_type: reportableType as 'User' | 'SalePost',
        reportable_id: reportId as number,
        images: imageUrls,
      }
    };

    try {
      const res = await UserApi.createReport(reportPayload);
      if (res.status === 201) {
        delay(() => {toast.success("Báo cáo thành công");})
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setReportContent("");
      setPreviewImages([]);
      setForm({ images: [] });
      delay(() => {hideLoading();  setShowModal(false);})
    }

    setShowModal(false);
    setReportContent("");
  };

  return (
    <div className={styles.optionsMenu} ref={menuRef}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <HiDotsHorizontal className={styles.menuIcon} />
      </button>
      {open && (
        <div
          className={styles.menuDropdown}
          onMouseLeave={handleMouseLeave}
        >
          <button className={styles.menuItem} onClick={handleReportClick}>
            <FiFlag className={styles.menuIcon} />
            Báo cáo
          </button>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Báo cáo</h3>
            {titleReport && <p className={styles.modalDescription}>
              {titleReport}
            </p>}
            <div className={styles.modalContent}>
              <textarea
                className={styles.modalTextarea}
                placeholder="Nhập nội dung báo cáo..."
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
              />
            </div>
            <div className={styles.imageUpload}>
              <ImageUpload onUpload={handleImageUpload} previewImages={previewImages} setPreviewImages={setPreviewImages} handleRemoveImage={handleRemoveImage} />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={handleCloseModal}>
                Hủy
              </button>
              <button className={styles.submitButton} onClick={handleSubmitReport}>
                Báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
