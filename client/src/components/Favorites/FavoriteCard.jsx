import React from 'react';
import Remove from './RemoveFavorite.jsx';
import { Link, useNavigate } from "react-router-dom";
import s from './FavoriteCard.module.css';
import { useDispatch } from 'react-redux';
import { getFavoritesLocalStorage, getPackageById, cleanPackageById, getRelationated, getAllActivities } from '../../redux/actions/index.js';

export default function Card({ name, image, price, id, popUp, componente, handleClickFav }){
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleGotoDetail(e){
		
		dispatch(cleanPackageById());
		setTimeout(() => {
		  dispatch(getPackageById(id));
		  dispatch(getRelationated(id));
		  dispatch(getAllActivities());  
		}, 2);
		navigate(`/detail/${id}`);

		// dispatch(getPackageById(id));
		// cual era la action xa el desmonte??
		dispatch(getFavoritesLocalStorage());
		handleClickFav()
	}

	return(
		<div className={s.favContainerCard}>
			<img src={image} alt='img not found' width='180vw' height='160vw'/>
			<div className={s.cardInfo}>
			<Link to={"/detail/" + id} key={id}>
				<div className={s.cardText} onClick={(e) => handleGotoDetail(e)}>
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