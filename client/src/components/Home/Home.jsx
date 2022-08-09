import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import style from "./Home.module.css";
import CardGenericContainer from "../Cards/CardGenericContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDestinations,
  getOnSale,
  getAllActivities,
  getAllPackage,
  getDestinationsWithPackages,
  createUser,
  getAllFavorites,
  getFeatured,
  getAllCart,
  postCartPackage,
  getCartLocalStorage,
  getFavoritesLocalStorage
} from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../Footer/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [loading, setLoading] = useState(true);
  const allDestinations = useSelector( (state) => state.destinationsWithPackages );
  const onSale = useSelector((state) => state.onsale);
  const user = useSelector( (state) => state.user )
  const featured = useSelector((state) => state.featured);
  const sortDestinations = allDestinations.sort();

  useEffect( () => {
    setLoading(true);
    const fetch = async () => {
      await dispatch(getAllPackage(1000));
      await dispatch(getAllDestinations());
      await dispatch(getDestinationsWithPackages());
      await dispatch(getOnSale());
      await dispatch(getAllActivities());
      await dispatch(getFeatured())
      // const token = await getAccessTokenSilently()
      // dispatch(createUser(token))
    }
    fetch()
    setLoading(false);
  }, [dispatch]);

  useEffect( async () => {
    const fetch = async () => {
      if (!isAuthenticated) {
      dispatch(getCartLocalStorage());
      dispatch(getFavoritesLocalStorage());
     } else {
      const token = await getAccessTokenSilently();
      // const res = await dispatch(createUser(token));
      await dispatch(getAllFavorites(token))
      try {
        await dispatch(getAllCart(user.id));
      } catch(error) {
        await dispatch(postCartPackage(user.id, []))
        await dispatch(getAllCart(user.id));
      }
     }
   };
   fetch();
  }, []);

  return (
    <div className={style.home_container}>
      { (loading) ? (
        <div className={style.contenedorSpinner}>
          <div className={style.spinner}></div>
        </div>
      ) : (
        <React.Fragment>
          <Hero destinations={sortDestinations} />
          <div className={style.feature_container}>
            <h2 className={style.h2}>Destacados</h2>
            <CardGenericContainer listCards={featured} />
          </div>
          <div className={style.promotions_container}>
            <h2 className={style.h2}>Promociones</h2>
            <CardGenericContainer listCards={onSale} component='promotions' />
          </div>
        </React.Fragment>
      )}
     <Footer />
    </div>
  );
}
