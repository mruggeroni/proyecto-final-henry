import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillCaretLeftFill } from "react-icons/bs";
import {
  getAllDestinations,
  filterPackagesByDestination,
} from "../../redux/actions/index";
import style from "./Navbar.module.css";

export default function NavRegion({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allDestinations = useSelector((state) => state.destinations);

  useEffect(() => {
    if(!allDestinations.length) {
      dispatch(getAllDestinations());
    }
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(filterPackagesByDestination(e.target.innerText));
    navigate("/search");
    // navigate(`/search/${e.target.innerText}`);
    handleClose();
  }

  function handleBackMenu() {
    document
      .getElementById("nav_menu_region")
      .classList.remove(`${style.is_active}`);
  }

  return (
    <nav id="nav_menu_region" className={`${style.nav_menu}`}>
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
        key={"Europa Occidental" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        Europa Occidental
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Europa Central" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        Europa Central
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Europa Oriental" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        Europa Oriental
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Asia Oriental" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        Asia Oriental
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Asia del Sur" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        Asia del Sur
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Asia Sudoriental Continental" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        Asia Sudoriental Continental
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Norte América" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        Norte América
      </NavLink>
      <NavLink
        to={`/search`}
        key={"Sudamérica" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        Sudamérica
      </NavLink>
      <NavLink
        to={`/search`}
        key={"América Central" + "destinations"}
        onClick={(e) => handleClick(e)}
        className={style.nav_menu_item}
      >
        América Central
      </NavLink>
    </nav>
  );
}
