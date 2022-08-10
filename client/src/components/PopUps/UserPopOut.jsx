import React, { useEffect, useState } from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import style from "./User.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import UserEdit from "../UserEdit/UserEdit";
import { NavLink } from "react-router-dom";
import { createUser, getAllFavorites, postFavorites, getAllCart, postCartPackage } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import s from "./PopUps.module.css";

export default function UserPopOut({ showProfile, setShowProfile, divBackground }) {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    loginWithPopup,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const user = useSelector( (state) => state.user )
  const favorites = useSelector( (state) => state.favorites)
  const cart = useSelector( (state) => state.cart );
  const [showUser, setShowUser] = useState(false);

  useEffect(async () => {
    const token = await getAccessTokenSilently();
    // dispatch(getAllFavorites(token));
    console.log(isAuthenticated);
    if(isAuthenticated){
      favorites.forEach((f) => dispatch(postFavorites(f.id, token)))
      dispatch(getAllFavorites(token, user.email));
      localStorage.removeItem('favorites');
      cart.forEach((c) => dispatch(postCartPackage(user.id)))
      dispatch(getAllCart(user.id));
      localStorage.removeItem('cart');
    }
}, [dispatch])

  function handleClickUser(e){
    setShowProfile(!showProfile);
    divBackground?.classList?.remove(`${s.is_active}`);
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
            <UserEdit handleClickUser={handleClickUser} />
          </div>
          {
            user.is_admin && <NavLink to="/dashboard" className={s.user_btn} onClick={ () => handleClickUser() }>
              Dashboard
            </NavLink>
          }
          <NavLink to="/contact-us" className={s.user_btn} onClick={ () => handleClickUser() }>
            Servicio al Cliente
          </NavLink>
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
