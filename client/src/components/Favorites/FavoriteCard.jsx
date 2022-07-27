import React from 'react';
import { useState } from 'react';
import Remove from './RemoveFavorite.jsx';
import AddToCart from './AddCart.jsx';
import s from './FavoriteCard.module.css';

export default function Card({ name, image, price, id }){

	return(
		<div className={s.container}>
			<img src={image} alt='img not found' width='250vw' height='225vw'/>
			<div className={s.cardInfo}>
				<div className={s.cardText}>
					<h3>{name}</h3>
					<h5>${price} per Person</h5>
				</div>
				<div className={s.buttons}>
					<Remove id={id}/>
					<AddToCart id={id}/>
				</div>
			</div>
		</div>
	);
}