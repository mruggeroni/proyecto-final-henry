import React, { useState, useEffect } from "react";
import style from "./Hero.module.css";
import FilterSearch from "./FilterSearch/FilterSearch.jsx";
import Poster from "./Poster/Poster";
import img from "./../../assets/img/background-image.jpg";
import ControlledCarousel from "../Detail/Carousel";
import { AiOutlineSound } from "react-icons/ai";
import { BiVolumeMute } from "react-icons/bi";
import YouTube from "@u-wave/react-youtube";

export default function Hero({ destinations }) {
  const [isMuted, setIsMuted] = useState(false);

  function handleSound(e){
    e.preventDefault();
    setIsMuted(!isMuted);
  }

  return (
    <div className={style.hero_container}>
        <YouTube
          video="Q8Zx6e8NiK8"
          autoplay={true}
          controls={false}
          disableKeyboard={true}
          disablekb={true}
          modestBranding={true}
          showRelatedVideos={false}
          showInfo={false}
          allowFullscreen={false}
          suggestedQuality={1060}
          muted={!isMuted}
          volume={0.3}
          onPause={() => console.log("no se puede poner pausa")}
          widht='100%'
          height='100%'
          // playerVars= { {loop: 1} }
          loop= {true}
          className={style.video_container}
        />
      <div className={style.hero_filter}>
        <div className={style.filter_container}>
          <div className={style.soundContainer}></div>
          <FilterSearch destinations={destinations} />
      <div onClick={(e) => handleSound(e)} className={style.soundContainer}>{!isMuted ? <BiVolumeMute /> : <AiOutlineSound /> }</div>
        </div>
      </div>
    </div>

    //   {/* <Poster /> */}
    //   <div className={style.hero_filter}>
    //     <div className={style.filter_container}>
    //       <FilterSearch destinations={destinations} />
    //     </div>
    //   </div>
    // </div>
  );
}
