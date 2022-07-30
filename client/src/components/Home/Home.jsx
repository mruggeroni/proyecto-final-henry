import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import style from "./Home.module.css";
import imgTest from "./../../assets/img/background-image2 2.jpg";
import CardGenericContainer from "../Cards/CardGenericContainer.jsx";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDestinations,
  getOnSale,
  getAllActivities,
  getAllPackage,
  getDestinationsWithPackages,
  createUser,
} from "../../redux/actions/index";
import BacktoTop from "../BacktoTop/BacktoTop";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    loginWithPopup,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [loading, setLoading] = useState(true);
  const allDestinations = useSelector(
    (state) => state.destinationsWithPackages
  );
  const onSale = useSelector((state) => state.onsale);
  const sortDestinations = allDestinations.sort();

  useEffect(async () => {
    setLoading(true);
    await dispatch(getAllPackage(1000));
    await dispatch(getAllDestinations());
    await dispatch(getDestinationsWithPackages());
    await dispatch(getOnSale());
    await dispatch(getAllActivities());
    // if (isAuthenticated) {
    //   const token = await dispatch(createUser(token));
    //   console.log(token);
    // }
    setLoading(false);
  }, [dispatch]);

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
        <React.Fragment>
          <Hero destinations={sortDestinations} />
          <div className={style.feature_container}>
            <h2 className={style.h2}>Destacados</h2>
            <CardGenericContainer listCards={onSale} />
          </div>
          <div className={style.promotions_container}>
            <h2 className={style.h2}>Promociones</h2>
            <CardGenericContainer listCards={onSale} />
          </div>
        </React.Fragment>
      )}
      {/* <BacktoTop/> */}
      {/* <Footer /> */}
    </div>
  );
}
