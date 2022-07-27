import React from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import style from "./User.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

export default function UserPopOut() {
  const { user, isAuthenticated, loginWithPopup, logout } = useAuth0();

  function handleClick(e) {
    e.preventDefault();
    document
      .getElementById("profile_container")
      .classList.toggle(`${style.open_profile}`);
      console.log( document
        .getElementById("profile_container")
        .classList)
  }

  return !isAuthenticated ? (
    <div onClick={loginWithPopup} className={style.nav_item}>
      <BsPersonPlusFill />
    </div>
  ) : (
    <div className={style.profile_container}>
      <button onClick={(e) => handleClick(e)} className={style.userIcon}>
        <img
          src={user.picture}
          alt={`Hi ${user.name}`}
          className={style.nav_item_profile}
        />
      </button>
      <div id="profile_container" className={style.user_profile_container}>
        <img src={user.picture} alt="" />
        <p>{user.name}</p>
        <hr />
        <div className={style.user_profile_menu}>
          <NavLink to="/dashboard" className={style.user_profile_link}>
            Profile
          </NavLink>
            <div>
              <p>Mi Perfil</p>
              <p>Historial de Compras</p>
              <p>Servicio al Cliente</p>
            </div>
        </div>
        <hr />
        <button className={style.user_profile_btn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
