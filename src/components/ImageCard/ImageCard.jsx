import s from "./ImageCard.module.css";
const ImageCard = ({
  data: {
    alt_description,
    id,
    urls: { small },
  },
}) => {
  return (
    <div className={s.wrapCard}>
      <img className={s.img} src={small} alt={alt_description} id={id} />
    </div>
  );
};
export default ImageCard;
