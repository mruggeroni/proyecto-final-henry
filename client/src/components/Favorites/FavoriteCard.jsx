import React from 'react';
import Remove from './RemoveFavorite.jsx';
import s from './FavoriteCard.module.css';

export default function Card({ name, image, price, id, popUp, componente }){

	return(
		<div className={s.favContainerCard}>
			<img src={image} alt='img not found' width='180vw' height='160vw'/>
			<div className={s.cardInfo}>
				<div className={s.cardText}>
					<h3>{name.length > 40 ? name.slice(0, 40) + '...' : name}</h3>
					<h5>${price} per Person</h5>
				</div>
				<div className={s.buttons}>
					<Remove id={id} popUp={popUp} componente={componente}/>
				</div>
			</div>
		</div>
	);
}