import { Activity } from "../models/Activities.js";
import { Classification } from "../models/Classification.js";

export const getActivities = async (req, res) => {
	try {
		const activities = await Activity.findAll({include: {
			model: Classification,
			attributes: ['name'],
		}});
		res.status(200).json(activities);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createActivity = async (req, res) => {
	console.log(req.body);
	const { name, description, image, price } = req.body;

	try {
		await Activity.create({
			name, description, image, price
		})
		res.status(200).json({message: 'Activity created successfully'});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}