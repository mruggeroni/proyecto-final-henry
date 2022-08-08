import React, { useEffect, useState } from "react";
import s from "./PopUps.module.css";
import CartPopUp from './CartPopUp.jsx';
import FavoritePopUp from './FavoritePopOut.jsx';
import UserPopOut from './UserPopOut';
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesLocalStorage, getCartLocalStorage, getAllFavorites, cleanPackageById, getPackageById, postFavorites, deleteFavorites, getAllCart, updateCart, postCartPackage } from "../../redux/actions/index.js";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "../../redux/actions/index";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function PopUpsComponent() {
    const {
        isAuthenticated,
        loginWithPopup,
        logout,
        getAccessTokenSilently,
    } = useAuth0();
    let cart = {};
    let stateCart = useSelector((state) => state.cart);
    let stateCartLocalStorage = useSelector((state) => state.cartLocalStorage);
    if(!isAuthenticated) {
      cart = {...stateCartLocalStorage};
    } else {
      cart = {...stateCart};
    }

    const user = useSelector( (state) => state.user );
    const detailPackage = useSelector( (state) => state.detailPackage )
    const id = detailPackage.id; 
    let favorites = [];
    let stateFavorites = useSelector((state) => state.favorites);
    let stateFavoritesLocalStorage = useSelector((state) => state.favoritesLocalStorage);
    if(!isAuthenticated) {
      favorites = [...stateFavoritesLocalStorage];
    } else {
      favorites = [...stateFavorites];
    }
    const [showFavoritePopUp, setShowFavoritePopUp] = useState(false);
    const [showUserPopUp, setShowUserPopUp] = useState(false);
    const [showCartPopUp, setShowCartPopUp] = useState(false);
    const dispatch = useDispatch();
    const divBackground = document.getElementById('popUpBackground')
      
    useEffect( async () => {
        if(!isAuthenticated){
            dispatch(getCartLocalStorage());
            dispatch(getFavoritesLocalStorage());
        }else{
            const token = await getAccessTokenSilently();
            dispatch(getAllFavorites(token));
            dispatch(getAllCart(user.id))
        }

        showFavoritePopUp === true || showUserPopUp === true || showCartPopUp === true ? document.getElementById("popUpBackground").classList?.add(`${s.is_active}`) : document.getElementById("popUpBackground")?.classList?.remove(`${s.is_active}`);
    }, [dispatch])

    // useEffect(() => {
    //     // setShowFavoritePopUp(true);
    //     setShowFavoritePopUp(false);
    //     setShowUserPopUp(false);
    //     setShowCartPopUp(false);
    // }, [favorites])

    const handleFavoritePopUp = () => {
        setShowFavoritePopUp(!showFavoritePopUp);
        showFavoritePopUp === false ? document.getElementById("popUpBackground").classList?.add(`${s.is_active}`) : document.getElementById("popUpBackground")?.classList?.remove(`${s.is_active}`);
        setShowUserPopUp(false);
        setShowCartPopUp(false);
    }

    const handleUserPopUp = async () => { 
        await loginWithPopup();
        const token = await getAccessTokenSilently();
        let res = await dispatch(createUser(token));
        let resAllCart;
        try {
            resAllCart = await dispatch(getAllCart(res.payload.id));
        } catch(error) {
            await dispatch(postCartPackage(res.payload.id, []))
            resAllCart = await dispatch(getAllCart(res.payload.id));
        }

        // Favorites
        let matchFav = true;
        stateFavoritesLocalStorage?.forEach( async (fLocal) => {
            stateFavorites.forEach( (f) => {
                if(f.id === fLocal.id) {
                    matchFav = false;
                    return;
                }
            })
            if(matchFav) await dispatch(postFavorites(fLocal.id, token))
        });
        localStorage.getItem('favorites') && localStorage.removeItem('favorites');
        await dispatch(getAllFavorites(token));
    
        // Cart
        let matchCart = true;
        stateCartLocalStorage.packages?.forEach( async (pLocal) => {
            resAllCart.payload.packages?.forEach( (p) => {
                if(p.id === pLocal.id) {
                    matchCart = false;
                    return;
                }
            })
            console.log(resAllCart.payload)
            if(matchCart) await dispatch(updateCart(resAllCart.payload.id, { 
                packageId: pLocal.id, 
                activitiesId: pLocal.activities?.map( (a) => a.id ) || [], 
                quantity: pLocal.quantity, 
                total_package: pLocal.total
            }))
        });
        localStorage.getItem('cart') && localStorage.removeItem('cart');
        await dispatch(getCartLocalStorage());
        
        
        
        await dispatch(cleanPackageById());
        if(id !== undefined) await dispatch(getPackageById(id));
        setShowFavoritePopUp(false);
        setShowCartPopUp(false);
        await dispatch(getAllCart(res.payload.id));
        // showFavoritePopUp === false ? document.getElementById("popUpBackground").classList?.add(`${s.is_active}`) : document.getElementById("popUpBackground")?.classList?.remove(`${s.is_active}`);
    }

    const handleCartPopUp = () => {
        // document.getElementById("popUpBackground").classList?.add(`${s.is_active}`);
        setShowCartPopUp(!showCartPopUp);
        showCartPopUp === false ? document.getElementById("popUpBackground").classList?.add(`${s.is_active}`) : document.getElementById("popUpBackground")?.classList?.remove(`${s.is_active}`);
        setShowFavoritePopUp(false);
        setShowUserPopUp(false);
      }
    
    const handleUserPopUpMenu = () => {
        // document.getElementById("popUpBackground").classList?.add(`${s.is_active}`);
        setShowFavoritePopUp(false);
        setShowUserPopUp(!showUserPopUp);
        setShowCartPopUp(false);
        showUserPopUp === false ? document.getElementById("popUpBackground").classList?.add(`${s.is_active}`) : document.getElementById("popUpBackground")?.classList?.remove(`${s.is_active}`);
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
            <div className={s.favoritesLength}>
                <div className={s.favIcons}>
                    <AiOutlineHeart />
                </div>
                {favorites?.length > 0 && <p className={s.badgeFav}>{favorites.length}</p>}
            </div>
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
            <div className={s.favoritesLength}>
                <div className={s.favIcons}>
                    <AiOutlineShoppingCart/>
                </div>  
                {cart.packages?.length > 0 && <p className={s.badgeFav}>{cart.packages.length}</p>}
            </div>
        </div>
        <div>
            <FavoritePopUp showProfile={showFavoritePopUp} setShowProfile={setShowFavoritePopUp} divBackground={divBackground}/>
            <UserPopOut showProfile={showUserPopUp} setShowProfile={setShowUserPopUp} divBackground={divBackground}/>
            <CartPopUp showProfile={showCartPopUp} setShowProfile={setShowCartPopUp} divBackground={divBackground}/>
            <div id="popUpBackground" onClick={() => handleClose()} className={`${s.nav_menu_container}`}></div>
        </div>
    </div>
  );
}