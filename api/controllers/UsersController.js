import { User } from '../models/Users.js';
import { Op } from 'sequelize';
import axios from 'axios';

export const getUsers = async (req, res) => {
	try {
		// console.log(req)
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createUser = async (req, res) =>{
	try {
		//console.log(req.body)
		const accessToken = req.body.headers.authorization.split(" ")[1];
		console.log("token: ", accessToken);
		const respuesta = await axios.get(
			"https://dev-33fzkaw8.us.auth0.com/userinfo",
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log(respuesta)
		const userInfo = respuesta.data;
		console.log("back: ", userInfo);
		const usuarioDB = await User.findOrCreate({where: {email: userInfo.email},
		defaults: {first_name: userInfo.given_name || userInfo.nickname,
			last_name: userInfo.family_name || "missing",
			photo: userInfo.picture,
			is_admin: false,
	}})
	console.log(usuarioDB)

		console.log('HERE')

		const role = usuarioDB[0].dataValues.is_admin === true? 'Admin': 'Client'
		console.log(role)
		let usuario = usuarioDB[1] === false? "login": "register"
		const currentUsuario = [usuario, role]
		console.log(currentUsuario)
		res.status(200).json({message: currentUsuario});
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export const putUser = async (req, res) => {
	try {
		const newUser = req.body;
		const id = req.params.id
		await User.update(newUser, {
			where: {
				id,
			}
		})
		const updatedUser = await User.findByPk(id)
		res.status(200).send(updatedUser)
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}

export const patchIs_adminProperty = async (req, res) => {
	try {
		const id = req.params.id
		const is_admin = req.body
		await User.update(is_admin, {
			where: {
				id,
			}
		})
		const updatedUser = await User.findByPk(id)
		res.status(200).send(updatedUser)
	} catch (e) {
		res.status(400).send({ data: e.message })
	}
}

export const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		const deleted = await User.findByPk(id)

		deleted && await User.destroy({
			where: {
				id
			}
		})
		deleted? res.status(200).send('User deleted successfully') 
		: res.status(200).send('The User was already deleted'); 
		
	} catch (error) {
		res.status(400).send({ data: error.message })
	}
}

export const getDeletedUsers = async (req, res) => {
	try {
		const deleted = await User.findAll({
			where:{
				destroyTime:{
					[Op.ne]: null,
				}
			},
			paranoid: false
		})
		deleted.length? res.status(200).send(deleted)
		: res.status(200).send('No deleted users found')
	} catch (error) {
		res.status(400).send({ data: error.message })
	}
}