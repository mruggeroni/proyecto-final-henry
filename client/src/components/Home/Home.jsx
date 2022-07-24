import React, { Fragment, useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import style from "./Home.module.css";
import imgTest from "./../../assets/img/background-image2 2.jpg";
import CardGeneric from "../CardGeneric/CardGeneric";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDestinations,
  getOnSale,
  getAllActivities,
} from "../../redux/actions/index";

export default function Home() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const allDestinations = useSelector((state) => state.destinations);
  const onSale = useSelector((state) => state.onsale);

  useEffect(async () => {
    setLoading(true);
    await dispatch(getAllDestinations());
    await dispatch(getOnSale());
    await dispatch(getAllActivities());
    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch(getAllDestinations());
    dispatch(getOnSale());
    dispatch(getAllActivities());
  }, [dispatch]);

  useEffect(() => {
    return async () => {
      await dispatch(getAllDestinations());
      await dispatch(getOnSale());
      await dispatch(getAllActivities());
    };
  }, [dispatch]);

  return (
    <div className={style.home_container}>
      {loading ? (
        <div className={style.contenedorSpinner}>
          <div className={style.spinner}></div>
        </div>
      ) : (
        <Fragment>
          <Hero />
          <div className={style.feature_container}>
            <h2>Destacados</h2>
            <div className={style.cards_container}>
              {
                // Para probar como se ven las cartas de descatados/ofertas
                onSale.map((i, idx) => (
                  <CardGeneric
                    key={idx}
                    feature={{
                      id: i.id,
                      img: imgTest,
                      title: i.name,
                      description: i.description.slice(0, 200) + "...",
                    }}
                  />
                ))
              }
            </div>
          </div>
          <div className={style.promotions_container}>
            <h2>Promociones</h2>
            <div className={style.cards_container}>
              {
                // Para probar como se ven las cartas de descatados/ofertas
                onSale.map((i, idx) => (
                  <CardGeneric
                    key={idx}
                    feature={{
                      id: i.id,
                      img: i.main_image,
                      title: i.name,
                      description: i.description.slice(0, 200) + "...",
                    }}
                  />
                ))
              }
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
