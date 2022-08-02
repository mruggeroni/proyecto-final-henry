import React, { useEffect, useState } from "react";
import s from "./PopUps.module.css";
import CartPopUp from './CartPopUp.jsx';
import FavoritePopUp from './FavoritePopOut.jsx';
import UserPopOut from './UserPopOut';
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesLocalStorage, getCartLocalStorage } from "../../redux/actions/index.js";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "../../redux/actions/index";


export default function PopUpsComponent() {
    // const cart = useSelector((state) => state.cart);
    const user = useSelector( (state) => state.user )
    const [showFavoritePopUp, setShowFavoritePopUp] = useState(false);
    const [showUserPopUp, setShowUserPopUp] = useState(false);
    const [showCartPopUp, setShowCartPopUp] = useState(false);
    const dispatch = useDispatch();
    const {
        isAuthenticated,
        loginWithPopup,
        logout,
        getAccessTokenSilently,
      } = useAuth0();
      
    useEffect(() => {
        dispatch(getCartLocalStorage());
        dispatch(getFavoritesLocalStorage())
    }, [dispatch])

    const handleFavoritePopUp = () => {
        document.getElementById("nav_menu").classList?.add(`${s.is_active}`);
        setShowFavoritePopUp(!showFavoritePopUp);
        setShowUserPopUp(false);
        setShowCartPopUp(false);
    }

    const handleUserPopUp = async () => { 
        document.getElementById("popUpBackground").classList?.add(`${s.is_active}`);
        await loginWithPopup();
        const token = await getAccessTokenSilently();
        await dispatch(createUser(token));
        setShowFavoritePopUp(false);
        setShowCartPopUp(false);
    }

    const handleCartPopUp = () => {
        document.getElementById("popUpBackground").classList?.add(`${s.is_active}`);
        setShowFavoritePopUp(false);
        setShowUserPopUp(false);
        setShowCartPopUp(!showCartPopUp);
      }
    
    const handleUserPopUpMenu = () => {
        document.getElementById("popUpBackground").classList?.add(`${s.is_active}`);
        setShowFavoritePopUp(false);
        setShowUserPopUp(!showUserPopUp);
        setShowCartPopUp(false);
    }

    function handleClose() {
        document.getElementById("popUpBackground")?.classList?.remove(`${s.is_active}`);
        setShowFavoritePopUp(false);
        setShowUserPopUp(false);
        setShowCartPopUp(false);
    }

  return (
    <div className={s.popUpContainer}>
        <div onClick={(handleFavoritePopUp)} className={s.eachIcon}>
            <AiOutlineHeart />
        </div>
        { !isAuthenticated ?
            <div onClick={handleUserPopUp} className={s.eachIcon}>
                <BsPersonPlusFill />
            </div>
            :                          
            <div id="menuProfile" className={s.eachIcon_img_container} onClick={handleUserPopUpMenu}>
                <img id="user_popout"
                width='35vw'
                height='35vh'
                className={s.eachIcon_img}
                src={
                    user.photo
                    ? user.photo
                    : "https://imgur.com/PabChcV.jpg"
                }
                alt={`Hi ${user.name}`} />
            </div> 
        }
        <div onClick={(handleCartPopUp)} className={s.eachIcon}>
            <AiOutlineShoppingCart/>
        </div>
        <div>
            <FavoritePopUp showProfile={showFavoritePopUp} setShowProfile={setShowFavoritePopUp} />
            <UserPopOut showProfile={showUserPopUp} setShowProfile={setShowUserPopUp} />
            <CartPopUp showProfile={showCartPopUp} setShowProfile={setShowCartPopUp} />
            <div id="popUpBackground" onClick={() => handleClose()} className={`${s.nav_menu_container}`} ></div>
        </div>
    </div>
  );
}