import { Classification } from '../models/Classification';

export const getCategories = async (req, res) => {
	try {
		const categories = await Classification.findAll();
		res.status(200).json(categories);
	} catch (error) {
		res.status(404).json({ message: error.message });
	};
};

export const createCategory = async (req, res) => {
	console.log(req.body);
	const { name, description } = req.body;

	try {
		await Category.create({
			name, 
			description,
		});
		res.status(201).json({message: 'Category created successfully'});
	} catch (error) {
		res.status(400).json({ message: error.message });
	};
};