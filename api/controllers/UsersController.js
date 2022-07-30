import axios from 'axios';
import { Op } from 'sequelize';
import { User } from '../models/Users.js';
import { Order } from '../models/Orders.js';
import { OrderItem } from '../models/OrderItems.js';
import { Package } from '../models/Packages.js';

export const getUsers = async (req, res) => {
	const { limitRender, page, destroyTime, is_admin } = req.query;

	try {
		const limitRend = parseInt(limitRender) || 30,
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
		const idUser = parseInt(id);

		const user = await User.findByPk(idUser, {
			include: {
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
			},
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
		res.status(201).json(usuarioDB);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}
