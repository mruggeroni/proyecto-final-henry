import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import style from "./User.module.css";
import s from "./PopUps.module.css";
import Card from "../Favorites/FavoriteCard.jsx";
import { HiOutlineEmojiSad } from "react-icons/hi";

export default function CartPopOut({ showProfile, setShowProfile, divBackground }) {
  // const cart = useSelector((state) => state.cart);
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [isVisible, setIsVisible] = useState(false);
  let sum = 0; 
  cart?.forEach((p) => p.total === 0 ? sum +=(p.paquete.price*p.cantidad) : sum += p.total);

  // function handleCartClick(e) {
  //   e.preventDefault();
  //   if(document.getElementById('favorite_container').classList.contains(`${s.open_favorite}`)) {
  //     document.getElementById('favorite_container').classList.add(`${s.user_profile_container}`);
  //     document.getElementById('favorite_container').classList.remove(`${s.open_favorite}`);
  //   } else if(document.getElementById('favorite_container').classList.contains(`${s.open_favorite}`)) {
  //     setIsVisible(false);
  //   } else {
  //     setIsVisible(!isVisible);
  //   }
  // }

  function handleClickCart(e){
    setShowProfile(false);
    divBackground?.classList?.remove(`${s.is_active}`);
  }

  return (
    !showProfile ? null :
    // <div onClick={(e) => handleCartClick(e)} className={style.nav_item}>
    //   <div className={s.favIcon}>
    //     <AiOutlineShoppingCart />
    //   </div>
    <div className={s.popUpInside}>
      <div id="cart_container"
            className={s.open_favorite}>
        <div>
          <h3 className={s.favTitle}>Mi Carrito ({cart ? cart.length : '0'})</h3>
          <hr />
          <div className={style.user_profile_link}>
            {cart?.length ?
              cart.map((p) => {
                return (
                  <div key={p.paquete.id}>
                    <Card
                      name={p.paquete.name}
                      image={p.paquete.main_image}
                      price={p.paquete.price}
                      id={p.paquete.id}
                      key={p.paquete.id}
                      popUp={"cart"}
                      handleClickFav={handleClickCart}
                    />
                  </div>
                );
              }) : 
              <div className={s.noPaq}>
                <div className={s.sadFace}>
                    <HiOutlineEmojiSad />
                  </div>
                  <p className={s.vacioPaq}>Tu carrito se encuentra vacío</p>
              </div>
              }
          </div>
          <hr />
          {cart?.length > 0 && 
            <div className={s.totalCartPrice}>
              <h3> Total:</h3>
              <h3>${sum}</h3>
            </div>
          }
          <Link to="/cart">
            <button className={s.allFavorite_btn} onClick={handleClickCart}>Ir al Carrito</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
