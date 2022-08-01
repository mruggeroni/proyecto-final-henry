import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import style from "./User.module.css";
import s from "./PopUps.module.css";
import Card from "../Favorites/FavoriteCard.jsx";
import { HiOutlineEmojiSad } from "react-icons/hi";

export default function FavoritesPopOut({ showProfile, setShowProfile }) {
  const favorites = useSelector((state) => state.favorites);
  const [isActive, setIsActive] = useState(false);

  function handleFavClick(e) {
    e.preventDefault();
    if(document.getElementById('cart_container').classList.contains(`${s.open_favorite}`)) {
      document.getElementById('cart_container').classList.add(`${s.user_profile_container}`);
      document.getElementById('cart_container').classList.remove(`${s.open_favorite}`);
      setIsActive(true);
    } else if(document.getElementById('cart_container').classList.contains(`${s.open_favorite}`)) {
      setIsActive(false);
    } else {
      setIsActive(!isActive);
    }
  }

  function handleClickFav(e){
    setShowProfile(false);
  }

  return (
    !showProfile ? null :
    // <div onClick={(e) => handleFavClick(e)} className={s.favIcon}>
    //   <div>
    //     <AiOutlineHeart />
    //   </div>
    <div className={s.popUpInside}>
      <div id="favorite_container" className={s.open_favorite}>
        <div>
          <h3 className={s.favTitle}>Mis Favoritos ({favorites && favorites?.length})</h3>
          <hr />
          <div className={style.user_profile_link}>
            {favorites.length ?
              favorites?.map((p) => {
                return (
                  <div key={p.id}>
                    <Card
                      name={p.name}
                      image={p.image}
                      price={p.price}
                      id={p.id}
                      key={p.id}
                      popUp={"favorites"}
                      handleClickFav={handleClickFav}
                    />
                  </div>
                );
              }) : 
              <div className={s.noPaq}>
                <div className={s.sadFace}>
                    <HiOutlineEmojiSad />
                  </div>
                  <p className={s.vacioPaq}>Tus favoritos se encuentra vacío</p>
              </div>
              }
          </div>
          <hr />
          <Link to="/favorites">
            <button className={s.allFavorite_btn} onClick={handleClickFav}>Todos mis Favoritos</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
