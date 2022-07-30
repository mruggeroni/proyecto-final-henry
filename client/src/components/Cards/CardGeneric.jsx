import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAllActivities,
  getPackageById,
  getRelationated,
} from "../../redux/actions";
import style from "./CardGeneric.module.css";

export default function CardGeneric({ feature }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getPackageById(feature.id));
    dispatch(getRelationated(feature.id));
    dispatch(getAllActivities());
    navigate(`/detail/${feature.id}`); //undefined
    scrollToTop();
  };

  return (
    <div className={style.cardG_container}>
      <div className={style.cardG_img_container}>
        <img
          src={feature.img}
          onError={(e) => (e.target.src = "https://imgur.com/rIBFMwH.png")}
          alt={feature.title + " not found"}
        />
      </div>
      <div className={style.cardG_title_container}>
        <h2>{feature.title}</h2>
      </div>
      <div className={style.cardG_description_container}>
        <p>
          {feature.description.length > 150
            ? feature.description.slice(0, 130) + "..."
            : feature.description}
        </p>
      </div>
      <div className={style.cardG_btn_container}>
        <div onClick={(e) => handleClick(e)}>+ info</div>
      </div>
    </div>
  );
}
