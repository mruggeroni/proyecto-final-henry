import React, { useState, useEffect, useCallback } from "react";
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
  const [backgroundV, setBackgroundV] = useState(true);

  function handleSound(e){
    e.preventDefault();
    setIsMuted(!isMuted);
  }

  // function changeBackground(){
  //   setBackgroundV(false);
  // }

  const changeBackground = useCallback(() => {
    setBackgroundV(false);
  }, []);

  return (
    <div className={style.hero_container}>
      {backgroundV ?
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
          suggestedQuality='1060'
          muted={!isMuted}
          volume={0.3}
          onPause={() => console.log("no se puede poner pausa")}
          widht='100%'
          height='100%'
          onEnd={changeBackground}
          className={style.video_container}
        /> 
        : <div className={style.backgroundImgHero}></div>} 

      <div className={style.hero_filter}>
        <div className={style.filter_container}>
          <div className={setBackgroundV ? style.soundContainer : style.displayNone}></div>
          <FilterSearch destinations={destinations} />
          <div onClick={(e) => handleSound(e)} className={setBackgroundV ? style.soundContainer : style.displayNone}>{!isMuted && setBackgroundV ? <BiVolumeMute /> : <AiOutlineSound /> }</div>
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
