import React from 'react';
import { useDispatch } from 'react-redux';
import s from './Remove.module.css';
// import { RemoveFavorite } from '../redux/actions';

export default function RemoveFavorite({ id }){
	// const dispatch = useDispatch();

	// const handleRemove = (e) => {
	//  e.preventDefault();
	// 	dispatch(RemoveFavorite(id));
	// 	window.location.reload();
	// }

	return(
			<a className={s.addRem}>Remove</a>
	)
}