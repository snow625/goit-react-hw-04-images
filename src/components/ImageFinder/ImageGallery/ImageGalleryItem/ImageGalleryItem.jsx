import { memo } from "react";
import PropTypes from "prop-types";

import style from "./imageGalleryItem.module.css";

const ImageGalleryItem = (props) => {
  const { src, alt, onClick, largeImageURL } = props;
  const obj = { largeImageURL, alt };

  return (
    <li onClick={() => onClick(obj)} className={style.item}>
      <img className={style.image} src={src} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default memo(ImageGalleryItem);
