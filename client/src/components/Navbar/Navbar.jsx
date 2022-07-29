import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsJustify, BsFillCaretRightFill } from "react-icons/bs";
import style from "./Navbar.module.css";
import NavDestinations from "./NavDestinations";
import NavPromotions from "./NavPromotions";
import PopUps from "./PopUps/PopUps";

export default function Navbar() {
  useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  function handleClose() {
    document.getElementById("nav_menu").classList?.remove(`${style.is_active}`);
    document
      .getElementById("nav_menu_items")
      .classList?.remove(`${style.is_active}`);
    document
      .getElementById("nav_menu_destinations")
      .classList?.remove(`${style.is_active}`);
    document
      .getElementById("nav_menu_promotions")
      .classList?.remove(`${style.is_active}`);
  }

  function handleOpen(idMenu) {
    document.getElementById("nav_menu").classList?.add(`${style.is_active}`);
    document.getElementById(idMenu).classList?.add(`${style.is_active}`);
  }

  //autenticacion

  return (
    <div id="nav" className={style.container}>
      <div id="nav_menu" onClick={() => handleClose()} className={`${style.nav_menu_container}`}>

      </div>
      <nav id="nav_menu_items" className={`${style.nav_menu}`}>
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
          onClick={() => handleOpen("nav_menu_promotions")}
          className={style.nav_menu_item}
        >
          Promociones <BsFillCaretRightFill />
        </button>
        <button
          onClick={() => handleOpen("nav_menu_destinations")}
          className={style.nav_menu_item}
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
          to="/contact"
          onClick={() => handleClose()}
          className={style.nav_menu_item}
        >
          Contacto
        </NavLink>
      </nav>

        <NavPromotions handleClose={handleClose} />
        <NavDestinations handleClose={handleClose} />

      <div className={style.nav_container}>
        <nav className={style.nav_items}>
          <button
            className={style.navButton}
            onClick={() => handleOpen("nav_menu_items")}
          >
            <BsJustify />
          </button>

          <div className={style.icons}>
            <PopUps />
          </div>
        </nav>
    </div>
  </div>
  );
}
