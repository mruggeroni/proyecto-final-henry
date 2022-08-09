import React, { useEffect } from "react";
import style from "./Hero.module.css";
import FilterSearch from "./FilterSearch/FilterSearch.jsx";
import Poster from "./Poster/Poster";
import img from "./../../assets/img/background-image.jpg";
import ControlledCarousel from "../Detail/Carousel";

export default function Hero({ destinations }) {
  return (
    <div className={style.hero_container}>
      <Poster />
      <div className={style.hero_filter}>
        <div className={style.filter_container}>
          <FilterSearch destinations={destinations} />
        </div>
      </div>
    </div>
  );
}
