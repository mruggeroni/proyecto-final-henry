import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { getAllDestinations } from "../../redux/actions/index";
import style from "./Navbar.module.css";

export default function NavDestinations({ handleClose }) {
  const dispatch = useDispatch();

  const allDestinations = useSelector((state) => state.destinations);

  useEffect(() => {
    dispatch(getAllDestinations());
  }, [dispatch]);

  function handleBackMenu() {
    document
      .getElementById("nav_menu_destinations")
      .classList.remove(`${style.is_active}`);
  }

  return (
    <nav id="nav_menu_destinations" className={`${style.nav_menu}`}>
      <div className={style.nav_menu_container_close}>
        <button onClick={() => handleClose()} className={style.nav_menu_close}>
          X
        </button>
      </div>
      <button
        onClick={() => handleBackMenu()}
        className={style.nav_menu_container_back}
      >
        <BsFillCaretLeftFill /> Volver
      </button>
      {allDestinations.map((el) => (
        // Click en el name, filtra y te lleva a search
        <NavLink
          to={`/`}
          key={el.name + "destinations"}
          onClick={() => handleClose()}
          className={style.nav_menu_item}
        >
          {el.name}
        </NavLink>
      ))}
    </nav>
  );
}
