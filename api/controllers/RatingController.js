import axios from 'axios';
import { Package } from "../models/Packages.js";
import { User } from "../models/Users.js";

// -------------- FUNCIONES AUXILIARES ------------------------
import { getUserInfoByToken } from './FavouritesController.js';
import { findOneUserFromDataBase } from './FavouritesController.js';
// ------------------------------------------------------------

// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InR1eVR1T0RKSnJCYlBTcUxRQmZpRyJ9.eyJpc3MiOiJodHRwczovL2Rldi0zM2Z6a2F3OC51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJlNDMzZjg3MTEzMzEwYWZmMTExMjYzIiwiYXVkIjpbImVuZHBvaW50UEYiLCJodHRwczovL2Rldi0zM2Z6a2F3OC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjU5MjkxMjM3LCJleHAiOjE2NTkzNzc2MzcsImF6cCI6Ing1Y0wxdWlUTDJSMEJSMFZYWVMwZEllcWtBNWdTZERtIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbIlN1cGVyQWRtaW4iXX0.l4sVv2zPPGdhlGuP06BlGyHtNBuNlJ5YZBGPBUF_crhnLvEYSRlJ4TWsD-xlV8JrEbQFHPFztiWy-N_uDp5AaJPne762fNmwcG7OSefNq1LMH6PHY9yOIGSRkROc2H0FH5FtO7geSo1S5SvElULJ-dHJtFisjGNsJ4gHD3dpEDnIgLh7ylfhSqGdH7jlcCa8aYvH2-TlUWpJ0MIlA6gin0LSZ963X3rTlce_fyyS7K1DXHyYkszlNO6qYWaJeSuhfAriI4T9REBnNLb_tSxEid4I61swkAMrINrcsVfPBr9sxb6EGkicib8DOWKlKdL1es-lJe7I0gOz3Cofm7aNpg

// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InR1eVR1T0RKSnJCYlBTcUxRQmZpRyJ9.eyJpc3MiOiJodHRwczovL2Rldi0zM2Z6a2F3OC51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJlNDM3MWVkZDQ3MDQ4NTcyNjE5MzE0IiwiYXVkIjpbImVuZHBvaW50UEYiLCJodHRwczovL2Rldi0zM2Z6a2F3OC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjU5MjkxMzc2LCJleHAiOjE2NTkzNzc3NzYsImF6cCI6Ing1Y0wxdWlUTDJSMEJSMFZYWVMwZEllcWtBNWdTZERtIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbIkFkbWluIl19.LdWVzfYQ7Udg-pa52yHjV8PSiW55Oy_zWdJi44HzIiLD_n4ntwSFRG5lfb3kZNr1HA-QWqIYdCjs1b5kuJj6xaZnElvtODgocY0zIpd4dB2iSIXufcVTKtPdSDtjO_Dl17b732M_BXQkagFROAHsUMzc_ngq_EOLI28-sRcPULK_DvTHAd5ddx7iPlKcougrOL0wg9_kiPTnMXmZb52hPJORc6ABbD6ep7rmTPFQK03jzLvkH3HPIiXNWNhWI6u1IwxDw_6WeI7A-jlDyfuALOqX2VEnTzjNwikBExZMenkdTeGYCT8aKcaG4eKICAsCaexbbsl81lKA1sp0ygMWGg

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
		const userInfo = await getUserInfoByToken(req);
		const user = await findOneUserFromDataBase(userInfo.email)
		const favourites = await user.getPackages({ joinTableAttributes: ['rating']})
		const filtered = []
		favourites.forEach(e => {
			if(e.ratingAndFavourite.rating !== null) filtered.push(e)
		})
		res.status(200).send(filtered)
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