import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsJustify, BsFillCaretRightFill } from "react-icons/bs";
import style from "./Navbar.module.css";
import NavDestinations from "./NavDestinations";
import NavRegion from "./NavRegion";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getAllCart, getAllFavorites, postCartPackage } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector( (state) => state.user );
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [showNavMenuItems, setShowNavMenuItems] = useState(false)
  const [showNavMenuDestinations, setShowNavMenuDestinations] = useState(false)
  const [showNavMenuRegion, setShowNavMenuRegion] = useState(false)
  
  useEffect( async () => {
    const token = await getAccessTokenSilently()
    // let res = dispatch(createUser(token))
    if(!isAuthenticated) {
      // dispatch(getFavoritesLocalStorage());
    } else {
      const token = await getAccessTokenSilently();
      await dispatch(getAllFavorites(token))
      try {
        await dispatch(getAllCart(user.id));
      } catch(error) {
        await dispatch(postCartPackage(user.id, []))
        await dispatch(getAllCart(user.id));
      }
    }

  }, [])


  function handleClose() {
    setShowNavMenu(false);
    setShowNavMenuItems(false);
    setShowNavMenuDestinations(false);
    setShowNavMenuRegion(false);
  }

  function handleOpen(idMenu) {
    setShowNavMenu(true);
    switch(idMenu) {
      case 'nav_menu_items':
        setShowNavMenuItems(true);
        setShowNavMenuRegion(false);
        setShowNavMenuDestinations(false);
        break;
      case 'nav_menu_region':
        setShowNavMenuItems(false);
        setShowNavMenuRegion(true);
        setShowNavMenuDestinations(false);
        break;
      case 'nav_menu_destinations':
        setShowNavMenuItems(false);
        setShowNavMenuRegion(false);
        setShowNavMenuDestinations(true);
        break;
    }
  }

  return (
    <div id="nav" className={style.container}>
      <div
        id="nav_menu"
        onClick={() => handleClose()}
        className={`${style.nav_menu_container} ${showNavMenu ? style.is_active : null }`} >
      </div>
      <nav id="nav_menu_items" className={`${style.nav_menu} ${showNavMenuItems ? style.is_active : null }`}>
        <div className={style.nav_menu_container_close}>
          <button
            onClick={() => handleClose()}
            className={style.nav_menu_close}
          >
            X
          </button>
        </div>
        <NavLink
          to="/"
          onClick={() => handleClose()}
          className={style.nav_menu_item}
        >
          Inicio
        </NavLink>
        <button
          onClick={() => handleOpen("nav_menu_region")}
          className={`${style.nav_menu_item} ${showNavMenuRegion ? style.is_active : null }`}
        >
          Regiones <BsFillCaretRightFill />
        </button>
        <button
          onClick={() => handleOpen("nav_menu_destinations")}
          className={`${style.nav_menu_item} ${showNavMenuDestinations ? style.is_active : null }`}
        >
          Destinos <BsFillCaretRightFill />
        </button>
        <NavLink
          to="/faq"
          onClick={() => handleClose()}
          className={style.nav_menu_item}
        >
          FAQ
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => handleClose()}
          className={style.nav_menu_item}
        >
          Contacto
        </NavLink>
      </nav>

      {/* <NavPromotions handleClose={handleClose} /> */}
      <NavDestinations showNavMenuDestinations={showNavMenuDestinations} handleOpen={handleOpen} handleClose={handleClose} />
      <NavRegion showNavMenuRegion={showNavMenuRegion} handleOpen={handleOpen} handleClose={handleClose} />

      <div className={style.nav_container}>
        <nav className={style.nav_items}>
          <button
            className={style.navButton}
            onClick={() => handleOpen("nav_menu_items")}
          >
            <BsJustify />
          </button>
          {/*       <div className={style.icons}>
            <PopUps />
          </div> */}
        </nav>
      </div>
    </div>
  );
}
