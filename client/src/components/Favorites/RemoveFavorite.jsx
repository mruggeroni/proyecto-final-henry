import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPackageById, getCartLocalStorage, getFavoritesLocalStorage, getPackageById, getAllFavorites, deleteFavorites, deleteCartPackage, getAllCart } from '../../redux/actions';
import s from './Remove.module.css';
import BotonFav from '../Detail/BotonFav';
import { useAuth0 } from "@auth0/auth0-react";

export default function RemoveFavorite({ id, popUp, componente }){
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const cart = useSelector( (state) => state.cart );
	const {
		isAuthenticated,
		loginWithPopup,
		logout,
		getAccessTokenSilently,
	  } = useAuth0();

	async function handleRemove(e){
	 	e.preventDefault();
		if(popUp === 'cart'){
			if(!isAuthenticated){
				let cart = JSON.parse(localStorage.getItem('cart'));
				let remPackage = cart.packages.find((p) => p.id === id)
				cart.packages = cart.packages.filter((p) => p.id !== id);
				cart.total_order -= remPackage.total; 
				localStorage.setItem('cart', JSON.stringify(cart));
				dispatch(getCartLocalStorage());
			} else{
				const token = await getAccessTokenSilently();
				await dispatch(deleteCartPackage(cart.id, id));
				await dispatch(getAllCart(user.id))
			}
		} else {	
			if(!isAuthenticated){
				let favorites = JSON.parse(localStorage.getItem('favorites'));
				let remFav = favorites.filter((f) => f.id !== id );
				localStorage.setItem('favorites', JSON.stringify(remFav));
				await dispatch(cleanPackageById());
				await dispatch(getPackageById(id));
				await dispatch(getFavoritesLocalStorage());
			} else {
				const token = await getAccessTokenSilently();
				await dispatch(deleteFavorites(id, token, user.email));
				await dispatch(getAllFavorites(token, user.email));
			}
		}	
	}

	return(
			componente === 'favoriteList' ?
			<a className={s.addRem} onClick={(e) => handleRemove(e)}><BotonFav checked={true} componente={componente}/></a> :
			<a className={s.addRem} onClick={(e) => handleRemove(e)}>Remove</a>
	)
}