import React from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import style from "./User.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { createUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function UserPopOut() {
  const { user, isAuthenticated, loginWithPopup, logout, getAccessTokenSilently } = useAuth0();

  async function handleClick(e) {
    try {
      e.preventDefault();
      document
        .getElementById("profile_container")
        .classList.toggle(`${style.open_profile}`);
    } catch (error) {
      console.log(error.message)
    }
  }
  const dispatch = useDispatch();
  const handleLogin = async (e) =>{
    try {
      e.preventDefault();
    const login = await loginWithPopup();
    const token = await getAccessTokenSilently()
    dispatch(createUser(token))
    } catch (error) {
      console.log(error.message)
    }
    
  }
  return !isAuthenticated ? (
    <div onClick={(e) => handleLogin(e)} className={style.nav_item}>
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
        </div>
        <hr />
        <button className={style.user_profile_btn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
