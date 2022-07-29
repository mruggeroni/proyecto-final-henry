import { User } from "../models/Users.js";
import { Order } from "../models/Orders.js";
import { Package, OrderItem } from '../models/Packages.js';

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
			include: [
				{
					model: User
				},
				{
					model: Package
				}
			]
		});

		! orderDetail
		? res.status(404).json({ message: "Order not found" })
		: res.status(200).json(orderDetail);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createOrder = async (req, res) => {
	const { userId, total_order, quantity, packageId } = req.body;

	try {
		const newOrder = await Order.create({
			userId,
			total_order,
		});
		
		for (let i = 0; i < packageId.length; i++) {
			const paquete = await Package.findByPk(packageId[i]);
			await newOrder.addPackage(paquete, {through: OrderItem});
		}
		
		res.status(200).json(newOrder);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}	