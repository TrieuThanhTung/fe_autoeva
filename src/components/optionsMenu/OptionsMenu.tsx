import { useState, useRef, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import styles from "./OptionsMenu.module.scss";
import { FiFlag } from "react-icons/fi";


interface OptionsMenuProps {
  onReport: (content: string) => void;
}

export default function OptionsMenu({ onReport }: OptionsMenuProps) {
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

  const handleSubmitReport = () => {
    onReport(reportContent);
    setShowModal(false);
    setReportContent("");
  };

  const handleCloseModal = () => {
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
            <textarea
              className={styles.modalTextarea}
              placeholder="Nhập nội dung báo cáo..."
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
            />
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
