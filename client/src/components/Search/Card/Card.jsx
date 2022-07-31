import React from "react";
import BotonFav from "../../Detail/BotonFav";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getFavoritesLocalStorage } from "../../../redux/actions/index";
import s from "./Cards.module.css";

export default function Card({ name, image, description, price, id }) {
  const [checked, setChecked] = useState(false);
  const favPackage = { name, image, description, price, id };
  const dispatch = useDispatch();

  function handleFavorite(e) {
    e.preventDefault();
    setChecked(!checked);

    if(!checked){
    if(!localStorage.getItem('favorites')) {
      let favorites = [];
      favorites.push(favPackage);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      let favorites = JSON.parse(localStorage.getItem('favorites'));
      if(favorites?.filter((f) => f.id !== id)){
        favorites.unshift(favPackage);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    }}else{
      let favorites = JSON.parse(localStorage.getItem('favorites'));
      let remFav = favorites.filter((f) => {return f.id !== id});
      localStorage.setItem('favorites', JSON.stringify(remFav));
    }
    dispatch(getFavoritesLocalStorage());
  }

  return (
    <div className={s.card}>
      <img src={image} alt="img not found" width="300vw" height="250vw" />
      <div className={s.cardBody}>
        <h3>{name}</h3>
        <br />
        <h5>
          {description.length > 310
            ? description.slice(0, 310) + "..."
            : description}
        </h5>
      </div>
      <div className={s.rightGroup}>

        <div className={s.price}>
          <h3>${price}</h3>
          <h5>per Person</h5>
        </div>

       
        <div className={s.hide} onClick={(e) => handleFavorite(e)}>
          <BotonFav checked={checked} id={id}/>
        </div>
      </div>
      <div>
        <button className={s.rectangle}>&gt;</button>
      </div>
    </div>
  );
}
