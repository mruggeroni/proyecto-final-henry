import { User } from "../models/Users.js";
import { Order } from "../models/Orders.js";
import { OrderItem } from "../models/OrderItems.js";
import { Package } from '../models/Packages.js';
import { Op } from "sequelize";

export const getOrders = async (req, res) => {

	const {user, status} = req.query;

	let filter = {status: {[Op.not]: 'shopping cart'}}

	if (status && !user) filter = {
		status: {
			[Op.and]: [{
				[Op.not]: 'shopping cart',
				[Op.eq]: status
			}]
		}
	};

	if (!status && user) filter = {
		status: {
			[Op.not]: 'shopping cart',
		},
		userId: user,
	};
	
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
			where: {
				status: {
					[Op.eq]: 'shopping cart',
				}, 
			},
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

export const patchStatusOrder = async (req, res) => {
	const orderId = parseInt(req.params.orderId);
	const { newStatus } = req.query;

	try {
		if (!(newStatus !== 'paid') || !(newStatus !== 'cancel')) throw new Error("Status order must be 'paid' or 'cancel'");

		const order = await Order.update({
			status: newStatus,
		}, {
			where: {
				[Op.and]: [{
					id: orderId,
				}, {
					status: 'pending',
				}],
			},
		});

		order ? 
		res.status(200).json({ message: `Order status changed to \'${newStatus}\' successfully` }) : 
		res.status(404).json({ message: "Order not found" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const getCarts = async (req, res) => {
	const userId = parseInt(req.params.userId);
	const cartNumber = parseInt(req.query.cartNumber);

	try {
		const user = await User.findByPk(userId, {
			include: {
				model: Order,
				attributes: {
					exclude: ['userId'],
				},
				where: {
					status: {
						[Op.eq]: 'shopping cart',
					}, 
				},
				include: {
					model: OrderItem,
					through: {
						attributes: ['quantity'],
					},
				},
				include: {
					model: Package,
					attributes: {
						exclude: [
							'description', 
							'images', 
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
		});
		const carts = (user && user.orders.length) ? user.orders : null;
		const cart = carts ? carts[cartNumber - 1] : null;
		const response = cartNumber ? 
			cart : 
			{ 
				carts_quantity: carts ? carts.length : 0, 
				carts,
			};

		((!cartNumber && carts) || (cartNumber && cart)) ? 
		res.status(200).json(response) : 
		res.status(404).json({ message: `${cartNumber ? 'Cart' : 'Carts'} not found` });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const createCart = async (req, res) => {
	const { userId } = req.params;
	const { packagesId, quantitiesPackages, total_order } = req.body;

	try {
		const user = await User.findOne({
			where: {
				id: userId,
			},
			include: [{
				model: Order,
				include: {
					model: OrderItem,
				},
				include: {
					model: Package,
				},
			}],
		});
		const cart = await Order.create({
			total_order,
		});
		const paquetes = await Package.findAll({
			where: {
				id: packagesId,
			},
		});

		cart.setPackages(paquetes, { 
			through: OrderItem, 
		});
		user.addOrders(cart);

		await Order.findByPk(cart.id);
		await Promise.all(packagesId.map((packageId, index) => {
			return OrderItem.update({
				quantity: quantitiesPackages[index],
			}, {
				where: {
					[Op.and]: [{
						orderId: cart?.id,
					}, {
						packageId,
					}],
				},
			})
			.catch(err => console.log(err.message));
		}));
		return res.status(201).json({ message: 'Cart created successfully' });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	};
};

export const updateCart = async (req, res) => {
	const { cartId } = req.params;
	const { packagesId, quantitiesPackages, total_order } = req.body;

	try {
		await Order.update({
			total_order,
		}, {
			where: {
				[Op.and]: [{
					id: cartId,
				}, {
					status: 'shopping cart',
				}],
			},
		});
		const cart = await Order.findOne({
			where: {
				[Op.and]: [{
					id: cartId,
				}, {
					status: 'shopping cart',
				}],
			},
		});
		const paquetes = await Package.findAll({
			where: {
				id: packagesId,
			},
		});

		cart.setPackages(paquetes, { 
			through: OrderItem, 
		});

		await Order.findByPk(cart.id);
		await Promise.all(packagesId.map((packageId, index) => {
			return OrderItem.update({
				quantity: quantitiesPackages[index],
			}, {
				where: {
					[Op.and]: [{
						orderId: cartId,
					}, {
						packageId,
					}],
				},
			})
			.catch(err => console.log(err.message));
		}));
		return res.status(200).json({ message: 'Cart updated successfully' });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	};
};

export const patchStatusCart = async (req, res) => {
	const cartId = parseInt(req.params.cartId);

	try {
		const cart = await Order.update({
			status: 'pending',
		}, {
			where: {
				[Op.and]: [{
					id: cartId,
				}, {
					status: 'shopping cart',
				}],
			},
		});

		cart ? 
		res.status(200).json({ message: "Cart status changed to \'pending\' successfully" }) : 
		res.status(404).json({ message: "Cart not found" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const deleteCart = async (req, res) => {
	const cartId = parseInt(req.params.cartId);

	try {
		const cart = await Order.findByPk(cartId);
		cart && await Order.destroy({
			where: {
				[Op.and]: [{
					id: cartId,
				}, {
					status: 'shopping cart',
				}],
			},
		});

		cart ? 
		res.status(200).json({ message: "Cart deleted successfully" }) : 
		res.status(404).json({ message: "Cart not found" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};
