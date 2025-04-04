import React from "react";
import { Carousel } from "react-responsive-carousel";
import { BASE_NAME } from "@/config/constants";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./Sliders.module.scss";
import { CardImg } from "reactstrap";

export function Sliders(props) {
  const { gallery } = props;


  return (
    <div className={styles.content}>
      <Carousel
        infiniteLoop={true}
        // preventMovementUntilSwipeScrollTolerance={true}
        dynamicHeight={true}
        showStatus={false}
        showThumbs={false}
        autoPlay={true}
        // stopOnHover={true}
        swipeable={false}
        // centerMode={true}
        useKeyboardArrows={false}
        showArrows={false}
      >
        {gallery &&
          gallery.length > 0 &&
          gallery.map((item, index) => (
            <div className={styles.carousel_vim} key={index}>
              {item.image ? (
                <CardImg alt={`Slide ${index}`} src={BASE_NAME + item.image} />
              ) : (
                <p> Bienvenido !</p>
              )}
            </div>
          ))}
      </Carousel>
    </div>
  );
}
