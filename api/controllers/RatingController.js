import axios from 'axios';
import { Package } from "../models/Packages.js";
import { RatingAndFavourite } from '../models/RatingAndFavourite.js';
import { User } from "../models/Users.js";

// -------------- FUNCIONES AUXILIARES ------------------------
import { getUserInfoByToken } from './FavouritesController.js';
import { findOneUserFromDataBase } from './FavouritesController.js';
// ------------------------------------------------------------

export const addRating = async (req, res) => {
  try {
    const id = req.params.id
    const rating = req.query.rating
    const userInfo = await getUserInfoByToken(req);
		const user = await findOneUserFromDataBase(userInfo.email)
		const packages = await Package.findByPk(id)
    packages.addUser(user, { through: { rating: rating } })
    res.status(200).send('Rating added successfully')
  } catch (e) {
    res.status(400).send({ data: e.message })
  }
}

export const getRating = async (req, res) => {
	try {
		const id = req.params.id
		const favourites = await RatingAndFavourite.findAll({where: {packageId: id}})
		let count = 0;
		favourites.forEach(e=> count += e.rating)
		count? res.status(200).send(Math.ceil((count / favourites.length)) + "") : res.status(200).send('This package is unrated')
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}

export const deleteRating = async (req, res) => {
	try {
		const id = req.params.id
		const userInfo = await getUserInfoByToken(req)
		const user = await findOneUserFromDataBase(userInfo.email)
		const packages = await Package.findByPk(id)
		user.addPackage(packages, { through: { rating: null } })
		res.status(200).send('Rating removed successfully')
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}