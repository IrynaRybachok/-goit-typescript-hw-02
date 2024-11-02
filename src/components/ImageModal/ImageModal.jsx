import Modal from "react-modal";
import { FaRegWindowClose } from "react-icons/fa";
import s from "./ImageModal.module.css";
const ImageModal = ({ isOpen, onCloseModal, image }) => {
  return (
    <Modal
      overlayClassName={s.backdrop}
      className={s.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      <button className={s.closeBtn} onClick={onCloseModal}>
        <FaRegWindowClose size="35" />
      </button>
      {image && (
        <div className={s.wrapImg}>
          <img
            className={s.img}
            src={image.urls.regular}
            alt={image.alt_description}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
