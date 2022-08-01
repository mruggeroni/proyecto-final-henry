import React from 'react';
import Remove from './RemoveFavorite.jsx';
import { Link } from "react-router-dom";
import s from './FavoriteCard.module.css';

export default function Card({ name, image, price, id, popUp, componente, handleClickFav }){
	
	return(
		<div className={s.favContainerCard}>
			<img src={image} alt='img not found' width='180vw' height='160vw'/>
			<div className={s.cardInfo}>
			<Link to={"/detail/" + id} key={id} onClick={handleClickFav}>
				<div className={s.cardText}>
					<h3>{name.length > 40 ? name.slice(0, 40) + '...' : name}</h3>
					<h5>${price} per Person</h5>
				</div>
			</Link>
				<div className={s.buttons} onClick={handleClickFav}>
					<Remove id={id} popUp={popUp} componente={componente}/>
				</div>
			</div>
		</div>
	);
}