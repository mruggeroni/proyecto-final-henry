import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsFillCaretLeftFill } from "react-icons/bs";
import {
  getAllDestinations,
  filterPackagesByDestination,
  getDestinationsWithPackages,
  filtrar
} from "../../redux/actions/index";
import style from "./Navbar.module.css";

export default function NavDestinations({ handleClose }) {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  // const params = props.match.params; 
  // const allDestinations = useSelector((state) => state.destinations);
  const allDestinations = useSelector((state) => state.destinationsWithPackages);

  useEffect(() => {
    dispatch(getAllDestinations());
    dispatch(getDestinationsWithPackages());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(filtrar(e.target.innerText, "searchDestinations"));
    // dispatch(filterPackagesByDestination(e.target.innerText));
    // console.log(params)

    navigate("/search");
    // navigate(`/search/${e.target.innerText}`);
    handleClose();
  }

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
          to={`/search`}
          key={el + "destinations"}
          onClick={(e) => handleClick(e)}
          className={style.nav_menu_item}
        >
          {el}
        </NavLink>
      ))}
    </nav>
  );
}
