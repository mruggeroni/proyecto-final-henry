import axios from 'axios';
import { Package } from "../models/Packages.js";
import { User } from "../models/Users.js";

// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InR1eVR1T0RKSnJCYlBTcUxRQmZpRyJ9.eyJpc3MiOiJodHRwczovL2Rldi0zM2Z6a2F3OC51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJlNDMzZjg3MTEzMzEwYWZmMTExMjYzIiwiYXVkIjpbImVuZHBvaW50UEYiLCJodHRwczovL2Rldi0zM2Z6a2F3OC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjU5MjAxMjUxLCJleHAiOjE2NTkyODc2NTEsImF6cCI6Ing1Y0wxdWlUTDJSMEJSMFZYWVMwZEllcWtBNWdTZERtIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbIlN1cGVyQWRtaW4iXX0.EkzoKz8Y3I0NxJjtbkSU_kuP6oyFRNrzxWgBd3gLkc2S7i2Twb_ad0t4o3uinf9L8q1IkP-uXq1vGhsbsVcz28QJ_qEVe1AizexwOuFW47lJz-klj4jX8Ng-AqFyO9UMLNe3A1d3n0hp3_uTPdJ3hATtvxogzresZQoGZkCdgYyzPynADmbklDS5NxF8wvrUqcgr6S19Wq8ShhAK_k2qbQZlqTbH24pcEIukbzewlqVxvC4QjyD-aa9HkG2rHTCDIfojl-vR3iiXldhLn7uGPt-V90FPGwCzTY7QgAUDNkBZT_k-3iLXUcPWfGFF3XTt7pD1bstOP8wSP6HK1bB2ug

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