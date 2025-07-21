import { useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./styles.css";

export default function Imageslider({ url, page = 5, limit = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(0);
  const [errorimg, setErrorImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    setLoading(true);

    const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
    const data = await response.json();

    if (data) {
      setImages(data);
      setLoading(false);
    } else {
      setErrorImage(e.message);
      setLoading(false);
    }
  }

  // console.log(images);

  function leftImage() {
    setCurrentSlider(
      currentSlider === 0 ? images.length - 1 : currentSlider - 1
    );
    // console.log(currentSlider);
  }

  function rightImage() {
    setCurrentSlider(currentSlider === images.length ? 0 : currentSlider + 1);

    // console.log(currentSlider);
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "50px",
        }}
      >
        <div>Loading data ! please wait</div>
      </div>
    );
  }

  if (errorimg !== null) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "50px",
        }}
      >
        <div>Error occured {errorimg} </div>;
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="container">
        <BsFillArrowLeftCircleFill
          className="arrow arrow-left"
          onClick={leftImage}
        />
        {images && images.length
          ? images.map((imagesItem, index) => (
              <img
                key={imagesItem}
                alt={imagesItem.download_url}
                src={imagesItem.download_url}
                className={
                  currentSlider === index
                    ? "current-image"
                    : "current-image hide-current-image"
                }
              />
            ))
          : null}
        <BsFillArrowRightCircleFill
          className="arrow arrow-right"
          onClick={rightImage}
        />
        <span className="circle-indicator" />
        {images && images.length
          ? images.map((_, index) => {
              <button
                key={index}
                className={
                  currentSlider === index
                    ? "current-indecator"
                    : "inactive-indicator"
                }
              ></button>;
            })
          : null}
      </div>
    </div>
  );
}
