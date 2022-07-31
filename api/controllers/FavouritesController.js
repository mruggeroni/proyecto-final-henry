import axios from 'axios';
import { Package } from "../models/Packages.js";
import { User } from "../models/Users.js";

const getUserInfoByToken = async (req) => {
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
const findOneUserFromDataBase = async (data) => {
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

export const addFavourite = async (req, res) => {
  try {
		const id = req.params.id
    const userInfo = await getUserInfoByToken(req);
		const packages = await Package.findByPk(id)
		const user = await findOneUserFromDataBase(userInfo.email)
		user.addPackage(packages)		
		res.status(200).send('Added to favourite successfully')
  } catch (e) {
    res.status(400).send({ data: e.message });
  }
}

export const getFavourites = async (req, res) => {
	try {
		const userInfo = await getUserInfoByToken(req);
		const user = await findOneUserFromDataBase(userInfo.email)
		const favourites = await user.getPackages({ joinTableAttributes: [] })
		res.status(200).send(favourites)
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}

export const deleteFavourite = async (req, res) => {
	try {
		const id = req.params.id
		const userInfo = await getUserInfoByToken(req)
		const user = await findOneUserFromDataBase(userInfo.email)
		const packages = await Package.findByPk(id)
		user.removePackage(packages)
		res.status(200).send('Favourite Package removed successfully')
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}