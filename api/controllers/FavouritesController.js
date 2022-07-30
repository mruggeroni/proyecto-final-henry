import axios from 'axios';
import { Package } from "../models/Packages.js";
import { User } from "../models/Users.js";

// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InR1eVR1T0RKSnJCYlBTcUxRQmZpRyJ9.eyJpc3MiOiJodHRwczovL2Rldi0zM2Z6a2F3OC51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJlNDMzZjg3MTEzMzEwYWZmMTExMjYzIiwiYXVkIjpbImVuZHBvaW50UEYiLCJodHRwczovL2Rldi0zM2Z6a2F3OC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjU5MjAxMjUxLCJleHAiOjE2NTkyODc2NTEsImF6cCI6Ing1Y0wxdWlUTDJSMEJSMFZYWVMwZEllcWtBNWdTZERtIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbIlN1cGVyQWRtaW4iXX0.EkzoKz8Y3I0NxJjtbkSU_kuP6oyFRNrzxWgBd3gLkc2S7i2Twb_ad0t4o3uinf9L8q1IkP-uXq1vGhsbsVcz28QJ_qEVe1AizexwOuFW47lJz-klj4jX8Ng-AqFyO9UMLNe3A1d3n0hp3_uTPdJ3hATtvxogzresZQoGZkCdgYyzPynADmbklDS5NxF8wvrUqcgr6S19Wq8ShhAK_k2qbQZlqTbH24pcEIukbzewlqVxvC4QjyD-aa9HkG2rHTCDIfojl-vR3iiXldhLn7uGPt-V90FPGwCzTY7QgAUDNkBZT_k-3iLXUcPWfGFF3XTt7pD1bstOP8wSP6HK1bB2ug

export const addFavourite = async (req, res) => {
  try {
		const id = req.params.id
    const accessToken = req.headers.authorization.split(" ")[1];
		const response = await axios.get(
			"https://dev-33fzkaw8.us.auth0.com/userinfo",
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		);
    const userInfo = response.data;
		const packages = await Package.findByPk(id)
		const user = await User.findOne({
			where:{
				email: userInfo.email,
			}
		})
		user.addPackage(packages)		
		res.status(200).send('Added to favourite successfully')
  } catch (e) {
    res.status(400).send({ data: e.message });
  }
}

export const getFavourites = async (req, res) => {
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
		const userInfo = response.data;
		const user = await User.findOne({
			where:{
				email: userInfo.email,
			}
		})
		const favourites = await user.getPackages({ joinTableAttributes: [] })
		res.status(200).send(favourites)
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}