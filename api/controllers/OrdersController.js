import { Op } from "sequelize";
import { User } from "../models/Users.js";
import { Order } from "../models/Orders.js";
import { OrderItem } from "../models/OrderItems.js";
import { Package } from '../models/Packages.js';
import { Activity } from "../models/Activities.js";

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
		const limit = parseInt(req.query.limit) || 100000;
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
	const orderId = parseInt(req.params.orderId);

	try {
		const orderDetail = await Order.findByPk(orderId, {
			where: {
				status: {
					[Op.not]: 'shopping cart',
				}, 
			},
			include: [
				{
					model: User,
				},
				{
					model: Package,
					attributes: {
						exclude: [
							'description',
							'images',
							'featured',
							'available',
							'on_sale',
							'destroyTime'
						]
					}
				},
			],
		});

		if (!orderDetail) return res.status(404).json({ message: 'Order not found' });


		const order = JSON.parse(JSON.stringify([orderDetail]));
		const ids = order[0].packages.map(p => p.order_item.id);
		const orderItems = await OrderItem.findAll({
			where: {
				id: ids,
			},
			include: {
				model: Activity,
				attributes: ['id', 'name', 'price'],
				through: {
					attributes: [],
				},
			},
		});

		order[0].packages.forEach(packg => {
			packg.quantity = packg.order_item.quantity;
			const activities = orderItems.find(orderItem => orderItem.id === packg.order_item.id);
			packg.activities = activities.activities;
			delete packg.order_item;
		});


		return res.status(200).json(order[0]);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const statusOrderFunction = async (orderId, status) => {
	await Order.update({
		status: status,
	}, {
		where: {
			[Op.and]: [{
				id: orderId,
			}, {
				status: 'pending',
			}],
		},
	});
};

export const patchStatusOrder = async (req, res) => {
	const orderId = parseInt(req.params.orderId);
	const { newStatus } = req.query;

	try {
		const status = newStatus.toLowerCase();
		if ((status !== 'paid') && (status !== 'cancel')) return res.status(400).json({ message: "Status order must be 'paid' or 'cancel'" });
		const existOrder = await Order.findByPk(orderId);
		if (!existOrder) return res.status(404).json({ message: "Order not found" });
		if (existOrder.status === 'shopping cart') return res.status(400).json({ message: "The id entered is not from a order" });
		if (existOrder.status !== 'pending') return res.status(400).json({ message: "The id entered is not from a order pending" });

		await statusOrderFunction(orderId, status);

		res.status(200).json({ message: `Order status changed to \'${status}\' successfully` });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const getCart = async (req, res) => {
	const userId = parseInt(req.params.userId);

	try {
		const existUser = await User.findByPk(userId);
		if (!existUser) return res.status(404).json({ message: 'User not found' });
		const user = await User.findByPk(userId, {
			include: {
				model: Order,
				where: {
					status: {
						[Op.eq]: 'shopping cart',
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
							'destroyTime'
						],
					},
				},
			},
		});
		if (!user) return res.status(404).json({ message: 'User does not have a cart' });

		const cart = JSON.parse(JSON.stringify(user.orders[0]));
		const ids = cart.packages.map(p => p.order_item.id);
		const orderItems = await OrderItem.findAll({
			where: {
				id: ids,
			},
			include: {
				model: Activity,
				attributes: ['id', 'name', 'price'],
				through: {
					attributes: [],
				},
			},
		});

		cart.packages.forEach(packg => {
			packg.quantity = packg.order_item.quantity;
			const activities = orderItems.find(orderItem => orderItem.id === packg.order_item.id);
			packg.activities = activities.activities;
			delete packg.order_item;
		});

		cart.total_order_discounted = cart.packages.reduce((sum, pack) => 
			sum + ((100 - pack.on_sale) / 100) * pack.quantity * (pack.price + pack.activities.reduce((sum, act) => 
				sum + act.price, 
				0
			)), 
			0
		);

		return res.status(200).json(cart);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const createCart = async (req, res) => {
	const { userId } = req.params;
	const cartPackages = req.body;

	try {
		const user = await User.findByPk(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });
		const existCart = await Order.findOne({
			where: {
				[Op.and]: [{
					userId,
				}, {
					status: 'shopping cart',
				}],
			},
		});
		if (existCart) return res.status(400).json({ message: 'User already has a cart' });

		const packagesId = [],
			arrayActivitiesId = [],
			quantitiesPackages = [],
			total_packages = [];
		let total_order = 0;

		cartPackages.forEach(pack => {
			packagesId.push(pack.paquete.id);

			const activitiesId = [];
			pack.actividades.forEach(act => {
				activitiesId.push(act.Package_Activity.activityId);
			});
			arrayActivitiesId.push(activitiesId);

			quantitiesPackages.push(pack.cantidad);
			total_packages.push(pack.total);
		});
		total_order = total_packages.reduce((total, price) => total + price, 0);

		const cart = await Order.create({
			total_order,
		});
		const packs = await Package.findAll({
			where: {
				id: packagesId,
			},
		});

		await cart.setPackages(packs, { 
			through: OrderItem, 
		});
		await user.addOrders(cart);
		await Promise.all(packagesId.map((packageId, index) => {
			return OrderItem.update({
				quantity: quantitiesPackages[index],
			}, {
				where: {
					[Op.and]: [{
						orderId: cart.id,
					}, {
						packageId,
					}],
				},
			})
			.catch(err => console.log(err.message));
		}));

		const orderItems = await OrderItem.findAll({
			where: {
				[Op.and]: [{
					orderId: cart.id,
				}, {
					packageId: packagesId,
				}],
			},
		});

		await Promise.all(orderItems.map((orderItem, index) => {
			return Activity.findAll({where: {id: arrayActivitiesId[index]}})
				.then(activities => orderItem.setActivities(activities)) 
				.catch(err => console.log(err.message));
		}));

		return res.status(201).json({ message: 'Cart created successfully' });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	};
};

export const updateCart = async (req, res) => {
	const { cartId } = req.params;
	const /* cartPackages */ { packageId, activitiesId, quantity, total_package } = req.body;

	try {
		const oldCart = await Order.findByPk(cartId);
		if (!oldCart) return res.status(404).json({ message: 'Cart not found' });
		if (oldCart.status !== 'shopping cart') return res.status(400).json({ message: "The id entered is not from a cart" });

		// const packagesId = [],
		// 	arrayActivitiesId = [],
		// 	quantitiesPackages = [],
		// 	total_packages = [];
		// let total_order = 0;

		// cartPackages.forEach(pack => {
		// 	packagesId.push(pack.paquete.id);

		// 	const activitiesId = [];
		// 	pack.actividades.forEach(act => {
		// 		activitiesId.push(act.Package_Activity.activityId);
		// 	});
		// 	arrayActivitiesId.push(activitiesId);

		// 	quantitiesPackages.push(pack.cantidad);
		// 	total_packages.push(pack.total);
		// });
		// total_order = total_packages.reduce((total, price) => total + price, 0);

		// await Order.update({
		// 	total_order,
		// }, {
		// 	where: {
		// 		id: cartId,
		// 	},
		// });

		// const cart = await Order.findByPk(cartId);
		// const paquetes = await Package.findAll({
		// 	where: {
		// 		id: packagesId,
		// 	},
		// });

		// await cart.setPackages(paquetes, { 
		// 	through: OrderItem, 
		// });
		// await Promise.all(packagesId.map((packageId, index) => {
		// 	return OrderItem.update({
		// 		quantity: quantitiesPackages[index],
		// 	}, {
		// 		where: {
		// 			[Op.and]: [{
		// 				orderId: cartId,
		// 			}, {
		// 				packageId,
		// 			}],
		// 		},
		// 	})
		// 	.catch(err => console.log(err.message));
		// }));

		// const orderItems = await OrderItem.findAll({
		// 	where: {
		// 		[Op.and]: [{
		// 			orderId: cart.id,
		// 		}, {
		// 			packageId: packagesId,
		// 		}],
		// 	},
		// });

		// await Promise.all(orderItems.map((orderItem, index) => {
		// 	return Activity.findAll({where: {id: arrayActivitiesId[index]}})
		// 		.then(activities => orderItem.setActivities(activities)) 
		// 		.catch(err => console.log(err.message));
		// }));

		const existPackageInCart = await Order.findByPk(cartId, {
			include: {
				model: Package,
				where: {
					id: packageId,
				},
			},
		});
		if (existPackageInCart) return res.status(400).json({ message: 'The package exist into the user\'s cart' });

		await Order.update({
			total_order: parseFloat(oldCart.total_order) + total_package,
		}, {
			where: {
				id: cartId,
			},
		});

		const cart = await Order.findByPk(cartId);
		const paquete = await Package.findByPk(packageId);

		await cart.addPackage(paquete, { 
			through: OrderItem, 
		});

		await OrderItem.update({
			quantity,
		}, {
			where: {
				[Op.and]: [{
					orderId: cartId,
				}, {
					packageId,
				}],
			},
		})

		const orderItem = await OrderItem.findOne({
			where: {
				[Op.and]: [{
					orderId: cart.id,
				}, {
					packageId,
				}],
			},
		});

		const activities = await Activity.findAll({
			where: {
				id: activitiesId,
			},
		});

		await orderItem.setActivities(activities);

		return res.status(200).json({ message: 'Cart updated successfully' });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	};
};

export const statusCartFunction = async (cartId) => {
	await Order.update({
		status: 'pending',
	}, {
		where: {
			id: cartId,
		},
	});
};

export const patchStatusCart = async (req, res) => {
	const cartId = parseInt(req.params.cartId);

	try {
		const cart = await Order.findByPk(cartId);
		if (!cart) return res.status(404).json({ message: "Cart not found" });
		if (cart.status !== 'shopping cart') return res.status(400).json({ message: "The id entered is not from a cart" });

		await statusCartFunction(cartId);

		return res.status(200).json({ message: "Cart status changed to \'pending\' successfully" });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};

export const deleteCart = async (req, res) => {
	const cartId = parseInt(req.params.cartId);
	const packageId = parseInt(req.query.packageId);

	try {
		const cart = await Order.findByPk(cartId, {
			include: {
				model: Package,
				where: {
					id: packageId,
				},
			},
		});
		if (!cart) return res.status(404).json({ message: "Cart not found" });
		if (cart.status !== 'shopping cart') return res.status(400).json({ message: "The id entered is not from a cart" });

		const paquete = await Package.findByPk(packageId);

        const orderItemId = cart.packages[0].order_item.id;

        const orderItem = await OrderItem.findByPk(orderItemId, {
            include: {
                model: Activity,
            },
        }); 

        await Order.update({
            total_order: parseFloat(cart.total_order) - cart.packages[0].order_item.quantity * (paquete.price + orderItem.activities.reduce((sum, act) => sum + act.price, 0)),
        }, {
            where: {
                id: cart.id,
            },
        });

        await OrderItem.destroy({
            where: {
                id: orderItemId,
            },
        });

        await cart.removePackage(paquete);

		return res.status(200).json({ message: "Cart deleted successfully" }); 
	} catch (error) {
		return res.status(400).json({ message: error.message });
	};
};