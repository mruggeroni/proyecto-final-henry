import React from "react";
import { NavLink } from "react-router-dom";
import style from "./CardGeneric.module.css";

export default function CardGeneric({ feature }) {
  return (
    <div className={style.cardG_container}>
      <div className={style.cardG_img_container}>
        <img src={feature.img} alt={feature.title + " not found"} />
      </div>
      <div className={style.cardG_title_container}>
        <h2>{feature.title}</h2>
      </div>
      <div className={style.cardG_description_container}>
        <p>
          {feature.description.length > 150
            ? feature.description.slice(0, 150) + "..."
            : feature.description}
        </p>
      </div>
      <div className={style.cardG_btn_container}>
        <NavLink to={`/detail/${feature.id}`}>+ info</NavLink>
      </div>
    </div>
  );
}
