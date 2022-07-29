import { User } from '../models/Users.js';

export const getUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
