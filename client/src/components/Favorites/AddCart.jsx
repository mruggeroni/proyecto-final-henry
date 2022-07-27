import React from 'react';
import { useDispatch } from 'react-redux';
import s from './Remove.module.css';
// import {  } from '../redux/actions';

export default function AddToCart({ id }){

	return(
			<a className={s.addRem}>Add to Cart</a>
	)
}