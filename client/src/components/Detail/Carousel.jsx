import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import s from "./Carousel.module.css";

export default function ControlledCarousel({ name, main_image, images, componente }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const screen = window.visualViewport;

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval={1000}>
        <div className={componente === 'checkout' ? s.carouselForCheckout : s.item}>
          <img className="d-block w-100" src={main_image} alt="First slide" />
        </div>
      </Carousel.Item>

      {images?.map((i) => {
        return (
          <Carousel.Item key={'asdasd'+i} interval={500}>
            <div className={componente === 'checkout' ? s.carouselForCheckout : s.item}>
              <img className="d-block w-100" src={i} alt="Second slide" />
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
