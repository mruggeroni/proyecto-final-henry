import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import style from "./User.module.css";
import s from "./PopUps.module.css";
import Card from "../Favorites/FavoriteCard.jsx";

export default function CartPopOut() {
  const cart = useSelector((state) => state.cart);
  const [isVisible, setIsVisible] = useState(false);

  function handleCartClick(e) {
    e.preventDefault();
    if(document.getElementById('favorite_container').classList.contains(`${s.open_favorite}`)) {
      document.getElementById('favorite_container').classList.add(`${s.user_profile_container}`);
      document.getElementById('favorite_container').classList.remove(`${s.open_favorite}`);
    } else if(document.getElementById('favorite_container').classList.contains(`${s.open_favorite}`)) {
      setIsVisible(false);
    } else {
      setIsVisible(!isVisible);
    }
  }

  return (
    <div onClick={(e) => handleCartClick(e)} className={style.nav_item}>
      <div className={s.favIcon}>
        <AiOutlineShoppingCart />
      </div>
      <div id="cart_container"
            className={isVisible ? s.open_favorite : s.user_profile_container}>
        <div>
          <p className={s.favTitle}>Mi Carrito ({cart && cart.length})</p>
          <hr />
          <div className={style.user_profile_link}>
            {cart &&
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
                    />
                  </div>
                );
              })}
          </div>
          <hr />
          <Link to="/checkout">
            <button className={s.allFavorite_btn}>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
