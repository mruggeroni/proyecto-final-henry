import { Op } from "sequelize";
import { User } from "../models/Users.js";
import { Order } from "../models/Orders.js";
import { OrderItem } from "../models/OrderItems.js";
import { Package } from '../models/Packages.js';
import { Activity } from "../models/Activities.js";

import nodemailer from 'nodemailer';

const orderDetail = async (id) => {
	// const orderId = parseInt(req.params.orderId);
	try {
		const orderDetail = await Order.findByPk(id, {
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
							'destroyTime'
						]
					}
				},
			],
		});

		// if (!orderDetail) return res.status(404).json({ message: 'Order not found' });

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
			packg.total = packg.order_item.total;
			const activities = orderItems.find(orderItem => orderItem.id === packg.order_item.id);
			packg.activities = activities.activities;
			delete packg.order_item;
		});


		// return res.status(200).json(order[0]);
		return order[0];
	} catch (error) {
		// return res.status(400).json({ message: error.message });
		console.log(error.message);
	};
};

export const paidEmail = async (id, status) => {

	const order = await orderDetail(id);
	console.log(order);

	// let name = order.user.full_name;
	// let email = order.user.email;
	// let phone = '123456789';
	// let messageOk = 'Su pedido se realizó con éxito.';


	let mensajeOk = 'Su pedido ha sido realizado con éxito';
	let mensajeFail = 'Ha habido un error al procesar su pedido'

	let mensaje = status === 'paid' ? mensajeOk : mensajeFail;

	let contentHTML = `
		<h3>${mensaje}</h3>
		<p>A continuación le mostramos los detalles de su pedido:</p>
		<p>Nº de pedido: ${order.id} - Fecha: ${order.date}</p>
		<p>Importe total: ${order.total_order}</p>
		<ul>
			<li>Nombre: ${order.user.full_name}</li>
			<li>Email: ${order.user.email}</li>
			<li>Phone: ${order.phone}</li>
		</ul>
		<h3>Su compra:</h3>
		<ul>
		${order.packages.map(p => {
			let paquete = '<li>';
			paquete += 'Cant: ' + p.quantity + ' - ' + p.name + ' - Total: ' + p.total;
			if (p.activities.length) {
				paquete += '<ul>';
				paquete += p.activities.map(a => '<li>' + a.name + '</li>');
				paquete += '</ul>';
			}
			paquete += '</li>';
			return paquete;
		})}
		</ul>

		<p>Gracias por su compra</p>
	`;

	const transporter = nodemailer.createTransport({
		host: 'superbit.es',
		port: 465,
		auth: {
			user: 'travel@superbit.es',
			pass: '&6N5vh12d'
		},
		tls: {
			rejectUnauthorized: false,
		}
	});

	const info = await transporter.sendMail({
		from: "'Travel <travel@superbit.es>'",
		to: `${order.user.email}`,
		subject: 'Su pedido en Travel',
		html: contentHTML,
	});

	console.log('Message sent', info.messageId);
}
