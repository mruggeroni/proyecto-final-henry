import React from 'react';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import style from "./User.module.css";
import s from './PopUps.module.css'
import Card from '../Favorites/FavoriteCard.jsx';

export default function FavoritesPopOut(){
  const favorites = useSelector((state) => state.favorites);
  const [isActive, setIsActive] = useState(false);

  function handleFavClick(e) {
    e.preventDefault(); 
    setIsActive(!isActive);
  }

   return(
    <div onClick={(e) => handleFavClick(e)} className={s.favIcon}>
      <div>
      <AiOutlineHeart />
      </div>
      <div id="favorite_container" className={isActive ? s.open_favorite : s.user_profile_container}>
        <div>
          <p className={s.favTitle}>My Favorites ({favorites.length})</p>
          <hr />
          <div  className={style.user_profile_link}>
            {favorites && favorites.map((p) => {
              return(
                <div key= {p.id}>
                    <Card name={p.name} image={p.image} price={p.price} id={p.id} key= {p.id} popUp={'favorites'}/>
                </div>
              );
            })}
          </div>
          <hr />
          <Link to= '/favorites'>
            <button className={s.allFavorite_btn}>All Favorites</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
