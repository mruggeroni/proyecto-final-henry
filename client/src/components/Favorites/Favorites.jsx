import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteCard from "./FavoriteCard.jsx";
// import SortPrice from '../Search/SortPrice.jsx';
import s from "./Favorites.module.css";
import { getFavoritesLocalStorage } from "../../redux/actions/index.js";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getFavoritesLocalStorage());
  }, [dispatch]);

  return (
    <div className={s.fullContainer}>
      <h1 className={s.favTitle}>Favoritos({favorites ? favorites.length : '0'})</h1>
      <hr />
      {/* <div className={s.sort} onChange={(e) => handleSort(e)}>
				<SortPrice componente={'favoritesList'}/>
			</div> */}
      <div className={s.cardContainer}>
        {favorites?.length ? (
          favorites.map((p) => {
            return (
              <div className={s.eachCard} key={p.id}>
                <Link to={"/detail/" + p.id} key={p.id}>
                  <FavoriteCard
                    name={p.name}
                    image={p.image}
                    price={p.price}
                    id={p.id}
                    key={p.id}
                    componente={"favoriteList"}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <p className={s.noHay}>No hay Paquetes Favoritos!</p>
        )}
      </div>
    </div>
  );
}
