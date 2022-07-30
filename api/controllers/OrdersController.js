import { User } from "../models/Users.js";
import { Order } from "../models/Orders.js";
import { OrderItem } from "../models/OrderItems.js";
import { Package } from '../models/Packages.js';
import { Op } from "sequelize";

export const getOrders = async (req, res) => {

	const {user, status} = req.query;
	
	let filter = {};
	if (status && !user) filter = {status: status};
	if (!status && user) filter = {userId: user};
	if (status && user) filter = {status: status, userId: user};
	
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const offset = limit * (page - 1);
		const totalRows = await Order.count({
			where: filter,
			include: {
				model: User,
				attributes: [
					'id',
					'first_name',
					'last_name',
				],
			},
		});
		const totalPages = Math.ceil(totalRows / limit);

		const results = await Order.findAll({
			where: filter,
			include: {
				model: User,
				attributes: [
					'id',
					'first_name',
					'last_name',
				],
			},
			offset: offset,
			limit: limit,
			order: [
				['id', 'DESC']
			]
		});

		res.status(200).json({
			page, limit, totalRows, totalPages, results
		});
	} catch (error) {
		return res.status(404).json({ message: error.message });
	};
};


export const getOrderDetail = async (req, res) => {
	const orderId = parseInt(req.params.id);

	try {
		const orderDetail = await Order.findByPk(orderId, {
			include: [
				{
					model: User,
				},
				{
					model: Package,
				},
			],
		});

		! orderDetail
		? res.status(404).json({ message: "Order not found" })
		: res.status(200).json(orderDetail);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const getCart = async (req, res) => {
	const userId = parseInt(req.params.userId);

	try {
		const user = await User.findByPk(userId, {
			include: {
				model: Order,
				where: {
					status: {
						[Op.eq]: 'shopping cart',
					}, 
				},
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
						exclude: ['available', 'destroyTime', 'images' ],
					},
				},
			},
		});
		const cart = user.orders[0];

		cart ? 
		res.status(200).json(cart) : 
		res.status(404).json({ message: "Order not found" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const createCart = async (req, res) => {
	const { userId } = req.params;
	const { total_order, quantity, packagesId } = req.body;

	try {
		const user = await User.findOne({
			where: {
				id: userId,
				'$orders.status$': {
					[Op.not]: 'shopping cart',
				},
			},
			include: [{
				model: Order,
				as: 'orders',
				include: {
					model: OrderItem,
					attributes: {
						exclude: [],
					},
				},
				include: {
					model: Package,
					attributes: {
						exclude: ['id', 'available', 'destroyTime', 'images', 'price' ],
					},
				},
			}],
		});

		// if (!(Object.keys(existCart).length)) {
			const cart = await Order.create({
				total_order,
			});
			const paquetes = await Package.findAll({
				where: {
					id: packagesId,
				},
			});
			cart.addPackages(paquetes, { 
				through: OrderItem, 
			});
			user.addOrders(cart);
			const newCart = await Order.findByPk(cart.id);
			await OrderItem.update({
				quantity,
			}, {
				where: {
					orderId: newCart.id,
				},
			});
			return res.status(201).json(newCart/* user */);
		// } else {
		// 	throw new Error('user has shopping cart');
		// };
	} catch (error) {
		return res.status(400).json({ error: error.message });
	};
};
