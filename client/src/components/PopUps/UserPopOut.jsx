import React, { useState } from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import style from "./User.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import UserEdit from "../UserEdit/UserEdit";
import { NavLink } from "react-router-dom";
import { createUser } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import s from "./PopUps.module.css";

export default function UserPopOut({ showProfile, setShowProfile }) {
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

  // const handleLogin = async () => {
  //   await loginWithPopup();
  //   const token = await getAccessTokenSilently();
  //   await dispatch(createUser(token));
  // };

  function handleClickUser(e){
    setShowProfile(false);
  }

  return (
    !showProfile ? null :
    <div className={s.popUpInside}>
      <div
        id="profile_container"
        className={`${s.open_favorite} ${s.user_container}`}
      >
      <div>
        <img src={ user.photo
                    ? user.photo
                    : "https://imgur.com/PabChcV.jpg"
                } className={s.user_image} alt={user.full_name} />
        <h3 className={s.favTitle}>{user.full_name}</h3>
        <hr className={s.user_line} />
        <div className={s.user_profile_link}>
          {/* <div> */}
          <div className={s.user_btn}>
            <UserEdit />
          </div>
          <NavLink to="/dashboard" className={s.user_btn} onClick={handleClickUser}>
            Dashboard
          </NavLink>
          <NavLink to="./" className={s.user_btn} onClick={handleClickUser}>
            Servicio al Cliente
          </NavLink>
            {/* <p></p> */}
          {/* </div> */}
        </div>
        <hr />
        <button className={s.user_profile_btn} onClick={logout}>
          Logout
        </button>
      </div>
      </div>
    </div>
  );
}
