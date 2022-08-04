import React from 'react';
import { useDispatch } from 'react-redux';
import { cleanPackageById, getCartLocalStorage, getFavoritesLocalStorage, getPackageById, getAllFavorites, deleteFavorites } from '../../redux/actions';
import s from './Remove.module.css';
import BotonFav from '../Detail/BotonFav';
import { useAuth0 } from "@auth0/auth0-react";

export default function RemoveFavorite({ id, popUp, componente }){
	const dispatch = useDispatch();
	const {
		isAuthenticated,
		loginWithPopup,
		logout,
		getAccessTokenSilently,
	  } = useAuth0();

	async function handleRemove(e){
	 	e.preventDefault();
		if(!isAuthenticated){
			if(popUp === 'cart'){
				let cart = JSON.parse(localStorage.getItem('cart'));
				let remCart = cart.filter((c) => {return c.paquete.id !== id});
				  localStorage.setItem('cart', JSON.stringify(remCart));
				dispatch(getCartLocalStorage());
			} else {		
				let favorites = JSON.parse(localStorage.getItem('favorites'));
				let remFav = favorites.filter((f) => f.id !== id );
				  localStorage.setItem('favorites', JSON.stringify(remFav));
				dispatch(cleanPackageById());
				dispatch(getPackageById(id));
				dispatch(getFavoritesLocalStorage());
			}	
		} else{
			const token = await getAccessTokenSilently();
			try{
				if(popUp === 'cart'){
					let cart = JSON.parse(localStorage.getItem('cart'));
					let remCart = cart.filter((c) => {return c.paquete.id !== id});
					  localStorage.setItem('cart', JSON.stringify(remCart));
					dispatch(getCartLocalStorage());
				} else{
					dispatch(deleteFavorites(id, token));
				}
			}catch (e) {
				console.log(e.message);
			} dispatch(getAllFavorites(token));
		}
	}

	return(
			componente === 'favoriteList' ?
			<a className={s.addRem} onClick={(e) => handleRemove(e)}><BotonFav checked={true} componente={componente}/></a> :
			<a className={s.addRem} onClick={(e) => handleRemove(e)}>Remove</a>
	)
}