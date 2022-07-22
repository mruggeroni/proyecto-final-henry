import React from 'react';

export default function Card({ name, image, description, price }){
	return(
		<div class="card">
			<img src={image} alt='img not found'/>
			<div>
				<h3>{name}</h3>
				<h5>{description}</h5>
			</div>
			<div class="hide">
				<button>fav</button>
			</div>
			<div class="price">
				<h3>{price}</h3>
				<h5>per Person</h5>
			</div>
			<div class="rectangle">
				<button>></button>
			</div>
		</div>
	);
}