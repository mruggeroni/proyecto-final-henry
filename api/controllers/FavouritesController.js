import axios from 'axios';
import { Package } from "../models/Packages.js";
import { User } from "../models/Users.js";

//---------- FUNCIONES AUXILIARES ----------------------
export const getUserInfoByToken = async (req) => {
	try {
		const accessToken = req.headers.authorization.split(" ")[1];
		const response = await axios.get(
			"https://dev-33fzkaw8.us.auth0.com/userinfo",
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error.message)
	}
}
export const findOneUserFromDataBase = async (data) => {
	try {
		const user = await User.findOne({
			where:{
				email: data,
			}
		})
		return user;
	} catch (error) {
		console.log(error.message)
	}
}
//------------------------------------------------------
export const addFavourite = async (req, res) => {
  try {
		const id = req.params.id
		const email = req.body.email
		if(!email) return res.status(400).send('Missing data')
    
		const packages = await Package.findByPk(id)
		const user = await findOneUserFromDataBase(email)
		if(user) {
			user.addPackage(packages, { through: { favourite: true } }) 
			return res.status(200).send('Added to favourite successfully')
		}else {
			return res.status(400).send({data: 'Login required'})
		}
  } catch (e) {
    res.status(400).send({ data: e.message });
  }
}

export const getFavourites = async (req, res) => {
	try {
		const {email} = req.query
		if(!email) return res.status(400).send('Missing data')
    
		const user = await findOneUserFromDataBase(email)

		const favourites = await user.getPackages({ joinTableAttributes: ['favourite']})
		const filtered = []
		favourites.forEach(e => {
			if(e.ratingAndFavourite.favourite !== null && e.ratingAndFavourite.favourite !== false) filtered.push(e)
		})
		res.status(200).send(filtered)
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}

export const deleteFavourite = async (req, res) => {
	try {
		const id = req.params.id
		const {email} = req.query
		if(!email) return res.status(400).send('Missing data')
    
		const packages = await Package.findByPk(id)
		const user = await findOneUserFromDataBase(email)
		user.addPackage(packages, { through: { favourite: false } })
		res.status(200).send('Favourite Package removed successfully')
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}