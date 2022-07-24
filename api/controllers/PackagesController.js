import { Package } from '../models/Packages.js';
import { Classification } from '../models/Classification.js'
import { Activity } from '../models/Activities.js';
import { Destination } from '../models/Destinations.js';

export const getPackages = async (req, res) => {
	try {
		let price 
		req.query.price? price = req.query.price: price = 'DESC'
		const packages = await Package.findAll({
			include: [{
                model: Activity,
                attributes: ['name'],
                include: {model: Classification, attributes: ['name']}
			}, {model: Destination, attributes:['name']}],
			order: [['price', price]]
		});
		res.status(200).json(packages);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const getFeaturedPackages = async (req, res) => {
	try {
		const packages = await Package.findAll({
			where: {
				featured: true,
			},
			//include: {
			//	model: Classification,
			//	attributes: ['name'],
			//}
		});
		packages.length < 1
		? res.status(200).json({ message: 'There are no featured packages.' })
		: res.status(200).json(packages);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createPackage = async (req, res) => {
	console.log(req.body);
	const { name, description, main_image, images, price, featured, available, on_sale, categoryId } = req.body;

	try {
		const newPackage = await Package.create({
			name, description, main_image, images, price, featured, available, on_sale, categoryId
		});
		res.json({message: 'Package created successfully'});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}