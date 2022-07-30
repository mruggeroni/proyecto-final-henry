import React, { useState } from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import style from "./User.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import UserEdit from "../../UserEdit/UserEdit";
import { NavLink } from "react-router-dom";
import { createUser } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function UserPopOut() {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    loginWithPopup,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const user = useSelector( (state) => state.user )
  const [showUser, setShowUser] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setShowUser(!showUser);
    // if (e.target.id === "menuProfile") {
    // document
    // .getElementById("profile_container")
    // .classList.toggle(`${style.open_profile}`);
  }

  const handleLogin = async () => {
    await loginWithPopup();
    const token = await getAccessTokenSilently();
    await dispatch(createUser(token));
  };

  return !isAuthenticated ? (
    <div onClick={handleLogin} className={style.nav_item}>
      <BsPersonPlusFill />
    </div>
  ) : (
    <div className={style.profile_container}>
      <button id="menuProfile" onClick={handleClick} className={style.userIcon}>
        <img
          id="user_popout"
          src={
            user.photo
              ? user.photo
              : "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720"
          }
          alt={`Hi ${user.name}`}
          className={
            user.photo ? style.nav_item_profile : style.nav_item_profileError
          }
        />
      </button>
      <div
        id="profile_container"
        className={`${style.user_profile_container} ${
          showUser ? style.open_profile : null
        }`}
      >
        <img src={user.photo} alt={user.name} />
        <p>{user.name}</p>
        <hr className={style.create_line} />
        <div className={style.user_profile_menu}>
          <div>
            <UserEdit />
            <NavLink to="/dashboard" className={style.user_btn}>
              Dashboard
            </NavLink>
            <NavLink to="./" className={style.user_btn}>
              Servicio al Cliente
            </NavLink>
            {/* <p></p> */}
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
