import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  const clickImage = (e) => {
    const imgId = e.target.id;
    const findImage = images.find((image) => image.id === imgId);
    if (findImage) {
      openModal(findImage);
    }
  };

  return (
    <ul className={s.listCard} onClick={clickImage}>
      {images.map((data) => (
        <li className={s.card} key={data.id} data-id={data.id}>
          <ImageCard data={data} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
