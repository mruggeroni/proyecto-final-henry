import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillCaretLeftFill } from "react-icons/bs";
import {
  getAllDestinations,
  filtrar
} from "../../redux/actions/index";
import style from "./Navbar.module.css";

export default function NavRegion({ showNavMenuRegion, handleOpen, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allDestinations = useSelector((state) => state.destinations );

  useEffect(() => {
    if(!allDestinations.length) {
      dispatch(getAllDestinations());
    }
  }, [dispatch]);

  function handleClickRegion(e) {
    e.preventDefault();
    dispatch(filtrar(e.target.innerText, "region"))
    navigate("/search");
    handleClose();
  }

  function handleBackMenu() {
    handleOpen('nav_menu_items');
  }

  return (
    <nav id="nav_menu_region" className={`${style.nav_menu} ${showNavMenuRegion ? style.is_active : null }`}>
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
      <NavLink
        to={`/search`}
        key={"América Central" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        América Central
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Asia del Sur" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        Asia del Sur
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Asia Oriental" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        Asia Oriental
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Asia Sudoriental Continental" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        Asia Sudoriental Continental
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Europa Central" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        Europa Central
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Europa Occidental" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        Europa Occidental
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Europa Oriental" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        Europa Oriental
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Norte América" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        Norte América
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Sudamérica" + "destinations"}
        onClick={(e) => handleClickRegion(e)}
        className={style.nav_menu_item}
      >
        Sudamérica
      </NavLink>
    </nav>
  );
}
