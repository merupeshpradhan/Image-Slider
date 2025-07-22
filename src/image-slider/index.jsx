import { useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./styles.css";

export default function ImageSlider({ url, page = 1, limit = 5 }) {
  const [images, setImages] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(0);
  const [errImg, setErrImg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?pages=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrImg(e.message);
      setLoading(false);
    }
  }

  console.log(images);

  function leftSideImg() {
    setCurrentSlider(
      currentSlider === 0 ? images.length - 1 : currentSlider - 1
    );
    console.log(currentSlider);
  }

  function rightSideImg() {
    setCurrentSlider(
      currentSlider === images.length - 1 ? 0 : currentSlider + 1
    );
    console.log(currentSlider);
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Loading data ! please wait</div>;
  }

  if (errImg !== null) {
    return <div>Somthing went wrong {errImg}</div>;
  }

  return (
    <div className="full-container">
      <div className="container">
        <BsFillArrowLeftCircleFill
          onClick={leftSideImg}
          className="arrow arrow-left"
        />
        {images && images.length
          ? images.map((imageItem, index) => (
              <img
                key={index}
                alt={imageItem.download_url}
                src={imageItem.download_url}
                className={currentSlider === index?"current-image" :"current-image hide-current-image"}
              />
            ))
          : null}
        <BsFillArrowRightCircleFill
          onClick={rightSideImg}
          className="arrow arrow-right"
        />
        <span className="circle-indicators">
          {images && images.length
            ? images.map((_, index) => (
                <button
                  key={index}
                  className={
                    currentSlider === index
                      ? "current-indicator"
                      : "current-indicator inactive-indicator"
                  }
                ></button>
              ))
            : null}
        </span>
      </div>
    </div>
  );
}
