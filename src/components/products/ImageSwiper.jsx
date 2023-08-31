import { register } from "swiper/element/bundle";
import NoImage from "../../assets/img/src/no_image.png";

register();

const ImageSwiper = (props) => {
  const images = props.images;

  return (
    <swiper-container
      slides-per-view="1"
      navigation="true"
      pagination="true"
    >
      {images.length === 0 ? (
        <swiper-slide className="p-media__thumb">
          <img src={NoImage} alt="" />
        </swiper-slide>
      ) : (
        images.map((image) => (
          <swiper-slide className="p-media__thumb" key={image.id}>
            <img src={image.path} alt="商品画像" />
          </swiper-slide>
        ))
      )}
    </swiper-container>
  );
};

export default ImageSwiper;
