import { User } from '../models/Users.js';
import { Op } from 'sequelize';
import axios from 'axios';
import { Order } from '../models/Orders.js';
import { OrderItem } from '../models/OrderItems.js';
import { Package } from '../models/Packages.js';

export const getUsers = async (req, res) => {
	const { limitRender, page, destroyTime, is_admin } = req.query;
	//console.log(token)
	//console.log('HERE')
	//console.log(req)
	try {

		//console.log(respuesta)
		const limitRend = parseInt(limitRender) || 1000,
			pag = parseInt(page) || 1,
			is_ad = is_admin === 'true' ?
				true :
				is_admin === 'false' ?
					false :
					null;

		const users = await User.findAll({
			paranoid: false,
			where: {
				destroyTime: destroyTime === 'deleted' ? {
					[Op.not]: null,
				} :
					destroyTime === 'active' ?
						null :
						destroyTime ? {
							[Op.gte]: destroyTime,
						} : {
							[Op.or]: [{
								[Op.not]: null,
							}, {
								[Op.is]: null,
							}],
						},
				is_admin: (typeof is_ad === 'boolean') ? is_ad : {
					[Op.not]: null,
				},
			},
			attributes: {
				exclude: ['password', 'update_date'],
			},
			offset: limitRend * (pag - 1),
			limit: limitRend,
		});
		res.status(200).json(users);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	};
};

export const getUserDetail = async (req, res) => {
	const { id } = req.params;

	try {
		// const permissions = req.auth.permissions[0]
		const accessToken = req.headers.authorization.split(" ")[1];
		// console.log("token: ", accessToken);
		const respuesta = await axios.get(
			"https://dev-33fzkaw8.us.auth0.com/userinfo",
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const userInfo = respuesta.data;

		const idUser = parseInt(id);

		const user = await User.findByPk(idUser, {
			/* include: {
				model: Order,
				attributes: {
					exclude: ['userId'],
				},
				include: {
					model: OrderItem,
					attributes: {
						exclude: ['orderId', 'packageId'],
					},
				},
				include: {
					model: Package,
					attributes: {
						exclude: ['id', 'available', 'destroyTime', 'images', 'price' ],
					},
				},
			}, */
			attributes: {
				exclude: [
					'password',
					"is_admin",
					'created_date',
					'update_date',
					'destroyTime',
				],
			},
		});
		res.status(200).json(user);
		// if(permissions === 'SuperAdmin' || permissions === 'Admin' || user.email === userInfo.email){

		// }
		// else{
		// 	res.status(401).json({ message: 'You dont have permissions to see this information'})
		// }
	} catch (error) {
		return res.status(404).json({ message: error.message });
	};
};

export const getUserStatus = async (req, res) => {
	const { id } = req.params;
	const { includeDeleted = false } = req.query;

	try {
		const idUser = parseInt(id);

		const user = await User.findByPk(idUser, {
			[includeDeleted && 'paranoid']: false,
			attributes: ["email", "is_admin"],
		});
		res.status(200).json(user);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	};
};

export const createUser = async (req, res) => {
	try {
		const accessToken = req.body.headers.authorization.split(" ")[1];
		const respuesta = await axios.get(
			"https://dev-33fzkaw8.us.auth0.com/userinfo",
			{
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const userInfo = respuesta.data;
		const usuarioDB = await User.findOrCreate({
			where: { email: userInfo.email },
			defaults: {
				first_name: userInfo.given_name || userInfo.nickname,
				last_name: userInfo.family_name || "missing",
				photo: userInfo.picture,
				is_admin: false,
			}
		})
		const role = usuarioDB[0].dataValues.is_admin === true ? 'Admin' : 'Client'
		let usuario = usuarioDB[1] === false ? "login" : "register"
		const currentUsuario = [usuario, role]
		console.log(usuarioDB[0])
		res.status(200).json(usuarioDB[0]);
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
		deleted ? res.status(200).send('User deleted successfully')
			: res.status(200).send('The User was already deleted');

	} catch (error) {
		res.status(400).send({ data: error.message })
	}
}

export const getDeletedUsers = async (req, res) => {
	try {
		const deleted = await User.findAll({
			where: {
				destroyTime: {
					[Op.ne]: null,
				}
			},
			paranoid: false
		})
		deleted.length ? res.status(200).send(deleted)
			: res.status(200).send('No deleted users found')
	} catch (error) {
		res.status(400).send({ data: error.message })
	}
}

export const restoreUser = async (req, res) => {
	try {
		const id = req.params.id
		await User.restore({
			where: {
				id
			}
		})
		const restoredUser = await User.findByPk(id)
		res.status(200).send({ 'User restored successfully': restoredUser })
	} catch (error) {
		res.status(400).send({ data: error.message })
	}
}