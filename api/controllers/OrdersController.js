import { User } from "../models/Users.js";
import { Order } from "../models/Orders.js";
import { OrderItem } from "../models/OrderItems.js";
import { Package } from '../models/Packages.js';

export const getOrders = async (req, res) => {
	try {
		const orders = await Order.findAll({
			include: {
				model: User,
				attributes: [
					'id',
					'first_name',
					'last_name'
				],
			},
		});
		res.status(200).json(orders);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const getOrderDetail = async (req, res) => {
	
	const orderId = parseInt(req.params.id);

	try {
		const orderDetail = await Order.findByPk(orderId, {
			include: [{
				model: Package,
				attributes: ['name', 'price']
			}],
		});

		const user = await User.findByPk(orderDetail.userId);

		const respuesta = [user, orderDetail];

		res.status(200).json(respuesta);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createOrder = async (req, res) => {
	const { userId, totalOrder } = req.body;

	try {
		const newOrder = await Order.create({
			userId,
			totalOrder,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}