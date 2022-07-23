import React from 'react';
import { useState } from 'react';
import s from './FavoriteCard.module.css';

export default function Card({ name, image, price }){

	return(
		<div className={s.container}>
			<img src={image} alt='img not found' width='250vw' height='225vw'/>
			<div className={s.cardInfo}>
				<h3>{name}</h3>
				<h5>${price} per Person</h5>
				<div className={s.buttons}>
				<a>Remove</a>
				<a>Add to Cart</a>
				</div>
			</div>
		</div>
	);
}