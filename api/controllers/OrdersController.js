import { User } from "../models/Users.js";
import { Order } from "../models/Orders.js";

export const getOrders = async (req, res) => {
	try {
		const orders = await Order.findAll({
			include: {
				model: User,
				attributes: [
					// 'id',
					'first_name',
					'last_name'
				],
			}
		});
		res.status(200).json(orders);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}