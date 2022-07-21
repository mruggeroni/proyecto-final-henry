import { Category } from '../models/Categories.js';

export const getCategories = async (req, res) => {
	try {
		const categories = await Category.findAll();
		res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createCategory = async (req, res) => {
	console.log(req.body);
	const { name, description } = req.body;

	try {
		// const newCategory = await Category.create({
		// 	name, description
		// });
		await Category.create({
			name, description
		})
		res.status(200).json({message: 'Category created successfully'});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}