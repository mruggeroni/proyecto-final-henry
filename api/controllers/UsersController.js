import { User } from '../models/Users.js';
import { Op } from 'sequelize';
import axios from 'axios';
import { Order } from '../models/Orders.js';
import { OrderItem } from '../models/OrderItems.js';
import { Package } from '../models/Packages.js';
import { Activity } from '../models/Activities.js';

export const getUsers = async (req, res) => {
	const { limitRender, page, destroyTime, is_admin } = req.query;
	//console.log(token)
	console.log('HERE')
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
			include: {
				model: Order,
				attributes: {
					exclude: ['userId'],
				},
				include: {
					model: Package,
					attributes: {
						exclude: [
							'main_image',
							'description', 
							'images', 
							'seasson',
							'type',
							'featured', 
							'available', 
							'on_sale', 
							'destroyTime'
						],
					},
					through: {
						attributes: ['quantity'],
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
		if (!user) return res.status(404).json({ message: 'User not found' });

		const userCopy = JSON.parse(JSON.stringify(user));
		userCopy.orders.forEach(order => {
			order.packages.forEach(p => {
				p.quantity = p.order_item.quantity;
				delete p.order_item;
			});
		});
		userCopy.cart = userCopy.orders.filter(order => order.status === 'shopping cart')[0];
		userCopy.orders = userCopy.orders.filter(order => order.status !== 'shopping cart');
		userCopy.orders_pending = userCopy.orders.filter(order => order.status === 'pending');
		userCopy.orders_paid = userCopy.orders.filter(order => order.status === 'paid');
		userCopy.orders_cancel = userCopy.orders.filter(order => order.status === 'cancel');

		return res.status(200).json(userCopy);
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

		//console.log(respuesta)
		const userInfo = respuesta.data;
		const usuarioDB = await User.findOrCreate({where: {email: userInfo.email},
		defaults: {first_name: userInfo.given_name || userInfo.nickname,
			last_name: userInfo.family_name || "missing",
			photo: userInfo.picture,
			is_admin: false,
	}})
	const role = usuarioDB[0].dataValues.is_admin === true? 'Admin': 'Client'
	let usuario = usuarioDB[1] === false? "login": "register"
	const currentUsuario = [usuario, role]
	//console.log(usuarioDB[0])
	res.status(200).json(usuarioDB[0]);
	} catch (error) {
		console.log(error)
		return res.status(400).json({ message: error.message });
	}
}
export const createUserLocal = async (req, res) =>{
	try {
		const user = req.body
		const usuarioDB = await User.findOrCreate(user,{where: {email: req.body.email},
		defaults: {
			is_admin: false,
	}})
	const role = usuarioDB[0].dataValues.is_admin === true? 'Admin': 'Client'
	let usuario = usuarioDB[1] === false? res.status(200).json('This user alredy exists'): 
	console.log(usuarioDB[0])
	res.status(200).json(usuarioDB[0]);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}
export const LoginLocal = async (req, res) => {
	try {
	const email = req.body.email
	const password = req.body.password
	const usuario= User.findOne({where:{email: email}})
	usuario.password === password?  res.status(200).json(usuario): res.status(401).json({ message: 'Denied'})
		
	} catch (error) {
		return res.status(400).json({ message: error.message });
	
	}
	
}

export const putUser = async (req, res) => {
	try {
		// console.log('HERE')
		// const accessToken = req.headers.authorization.split(" ")[1];
		// console.log(accessToken)
		// const user = await axios.get(
		// 	"https://dev-33fzkaw8.us.auth0.com/userinfo",
		// 	{
		// 		headers: {
		// 			authorization: `Bearer ${accessToken}`,
		// 		},
		// 	}
		// );
		// const idU= user.data.sub
		// const email = user.data.email
		// try {
		// 	const respuesta = await axios.patch(
		// 		`https://dev-33fzkaw8.us.auth0.com/api/v2/users/${idU}`,
		// 		{
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 				"Authorization": `Bearer ${accessToken}`,
		// 			},
		// 			body: {
		// 				email: email
		// 			}
		// 		}
		// 	);
		// 	console.log(respuesta)
			
		// } catch (error) {
		// 	console.log(error)
		// }
		
		const email = req.query.email
		const newUser = req.body;
		await User.update(newUser, {
			where: {email: email}
		})
		const usuario = await User.findOne({where: {email: email}})
		res.status(200).send(usuario)
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