import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import style from "./User.module.css";
import s from "./PopUps.module.css";
import Card from "../Favorites/FavoriteCard.jsx";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { getAllCart } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function CartPopOut({
  showProfile,
  setShowProfile,
  divBackground,
}) {
  // const cart = useSelector((state) => state.cart);
  // const cart = JSON.parse(localStorage.getItem("cart"));
  const { isAuthenticated } = useAuth0();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  let cart = [];
  let stateCart = useSelector((state) => state.cart);
  let stateCartLocalStorage = useSelector((state) => state.cartLocalStorage);
  if (!isAuthenticated) {
    cart = { ...stateCartLocalStorage };
  } else {
    cart = { ...stateCart };
  }

  useEffect(async () => {
    if (isAuthenticated) {
      dispatch(getAllCart());
    }
  }, [dispatch]);

  // let sum = 0;
  // cart?.forEach((p) => p.total === 0 ? sum +=(p.paquete.price*p.cantidad) : sum += p.total);

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

  function handleClickCart(e) {
    setShowProfile(false);
    divBackground?.classList?.remove(`${s.is_active}`);
  }

  return !showProfile ? null : (
    // <div onClick={(e) => handleCartClick(e)} className={style.nav_item}>
    //   <div className={s.favIcon}>
    //     <AiOutlineShoppingCart />
    //   </div>
    <div className={s.popUpInside}>
      <div id="cart_container" className={s.open_favorite}>
        <div>
          <h3 className={s.favTitle}>
            Mi Carrito ({cart.packages ? cart.packages.length : "0"})
          </h3>
          <hr />
          <div className={style.user_profile_link}>
            {cart.packages?.length ? (
              cart.packages.map((p) => {
                return (
                  <div key={p.id}>
                    <Card
                      name={p.name}
                      image={p.main_image}
                      price={p.total/p.quantity}
                      total={p.total}
                      id={p.id}
                      key={p.id}
                      popUp={"cart"}
                      handleClickFav={handleClickCart}
                    />
                  </div>
                );
              })
            ) : (
              <div className={s.noPaq}>
                <div className={s.sadFace}>
                  <HiOutlineEmojiSad />
                </div>
                <p className={s.vacioPaq}>Tu carrito se encuentra vacío</p>
              </div>
            )}
          </div>
          <hr />
          {cart.packages?.length > 0 && (
            <div className={s.totalCartPrice}>
              <h3> Total:</h3>
              <h3>${cart.total_order_discounted || cart.total_order}</h3>
            </div>
          )}
          <Link to="/cart">
            <button className={s.allFavorite_btn} onClick={handleClickCart}>
              Ir al Carrito
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
