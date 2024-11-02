import { Image } from "../App/App.type";
import { MouseEvent } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

type Props = {
  images: Image[];
  openModal: (image: Image) => void;
};

const ImageGallery = ({ images, openModal }: Props) => {
  const clickImage = (e: MouseEvent<HTMLUListElement>): void => {
    const target = e.target as Element;
    const imgId = target.id;
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
