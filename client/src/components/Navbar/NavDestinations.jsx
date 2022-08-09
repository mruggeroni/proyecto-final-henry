import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsFillCaretLeftFill } from "react-icons/bs";
import {
  getAllDestinations,
  filterPackagesByDestination,
  getDestinationsWithPackages,
  filtrar,
  getAllPackage
} from "../../redux/actions/index";
import style from "./Navbar.module.css";

<<<<<<< HEAD
export default function NavDestinations({ handleClose }) {
=======
export default function NavDestinations({ showNavMenuDestinations, handleOpen, handleClose }) {
>>>>>>> 6619fdc4664f95d4d74e30022e796b228847e293
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const allDestinations = useSelector((state) => state.destinationsWithPackages);

  useEffect(() => {
    const fetch = async () => {
<<<<<<< HEAD
      await dispatch(getAllPackage(10000))
      dispatch(getAllDestinations());
=======
      await dispatch(getAllDestinations());
      await dispatch(getAllPackage(10000))
>>>>>>> 6619fdc4664f95d4d74e30022e796b228847e293
      dispatch(getDestinationsWithPackages());
    }
    fetch().catch(console.log("error"))
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(filtrar(e.target.innerText, "searchDestinations"));
<<<<<<< HEAD
    // dispatch(filterPackagesByDestination(e.target.innerText));
    // console.log(params)

=======
>>>>>>> 6619fdc4664f95d4d74e30022e796b228847e293
    navigate("/search");
    handleClose();
  }

  function handleBackMenu() {
    handleOpen('nav_menu_items');
  }

  return (
    <nav id="nav_menu_destinations" className={`${style.nav_menu} ${showNavMenuDestinations ? style.is_active : null }`}>
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
