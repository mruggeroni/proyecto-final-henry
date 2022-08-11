import React, { useEffect } from "react";
import BotonFav from "../../Detail/BotonFav";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPackage,
  getFavoritesLocalStorage,
  postFavorites,
  deleteFavorites,
  getAllFavorites,
} from "../../../redux/actions/index";
import s from "./Cards.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Card({ name, image, description, price, on_sale, id }) {
  const [checked, setChecked] = useState(false);
  const favPackage = { name, image, description, price, id };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  let favorites = [];
  let stateFavorites = useSelector((state) => state.favorites);
  let stateFavoritesLocalStorage = useSelector(
    (state) => state.favoritesLocalStorage
  );
  if (!isAuthenticated) {
    favorites = [...stateFavoritesLocalStorage];
  } else {
    favorites = [...stateFavorites];
  }

  useEffect(() => {
    favorites?.forEach((f) => f.id === id && setChecked(true));
  }, []);

  const checkPackageInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let match = false;
    cart?.forEach((p) => p.paquete.id === parseInt(id) && (match = true));
    return match;
  };

  async function handleFavorite(e) {
    e.preventDefault();
    // if (checkPackageInCart(id)) {
    //   return alert("ya esta en el carrito");
    // }
    setChecked(!checked);

    if (!isAuthenticated) {
      if (!checked) {
        if (!localStorage.getItem("favorites")) {
          let favorites = [];
          favorites.push(favPackage);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        } else {
          let favorites = JSON.parse(localStorage.getItem("favorites"));
          if (favorites?.filter((f) => f.id !== id)) {
            favorites.unshift(favPackage);
            localStorage.setItem("favorites", JSON.stringify(favorites));
          }
        }
      } else {
        let favorites = JSON.parse(localStorage.getItem("favorites"));
        let remFav = favorites.filter((f) => {
          return f.id !== id;
        });
        localStorage.setItem("favorites", JSON.stringify(remFav));
      }
      dispatch(getFavoritesLocalStorage());
    } else {
      const token = await getAccessTokenSilently();
      if (checked) {
        await dispatch(deleteFavorites(id, token, user.email));
        setChecked(false);
      } else {
        await dispatch(postFavorites(id, token, user.email));
        setChecked(true);
      }
      await dispatch(getAllFavorites(token, user.email));
    }
  }

  return (
    <div className={s.card}>
      {on_sale != "0" && (
        <div
          className={`${s.onSale} ${s.musRibbon} ${s.optionsRibbon} ${s.right}`}
        >
          <span>{on_sale}% OFF</span>
        </div>
      )}
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
        <div className={s.both}>
          <div className={s.price}>
            <div className={s.discount}>
              <h4>${on_sale ? <s>{price}</s> : price}</h4>
              {on_sale ? <h5>{price * ((100 - on_sale) / 100)}</h5> : " "}
            </div>
            <h5>por cabeza</h5>
          </div>
          <div className={s.hide} onClick={(e) => handleFavorite(e)}>
            <BotonFav
              setChecked={setChecked}
              checked={checked}
              id={id}
              favPackage={favPackage}
              componente={"search"}
            />
          </div>
        </div>
        <button className={s.rectangle}>&gt;</button>
      </div>
    </div>
  );
}
