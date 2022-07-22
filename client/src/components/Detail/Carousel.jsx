import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function ControlledCarousel({ name, main_image, images }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const screen = window.visualViewport



    return (

        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <div style={{
                    maxHeight: "600px"
                }}>
                    <img
                        className="d-block w-100"
                        src={main_image}
                        alt="First slide"
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div>
                    <img
                        className="d-block w-100"
                        src={images[0]}
                        alt="Second slide"
                    />
                </div>

            </Carousel.Item>
            <Carousel.Item>
                <div>
                    <img
                        className="d-block w-100"
                        src={images[1]}
                        alt="Third slide"
                    />
                </div>

            </Carousel.Item>
            <Carousel.Item>
                <div>
                    <img
                        className="d-block w-100"
                        src={images[2]}
                        alt="Fourth slide"
                    />
                </div>

            </Carousel.Item>
        </Carousel>

    );
}
