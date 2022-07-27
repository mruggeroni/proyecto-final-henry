
import { Classification } from "/home/sadnena/pf/proyecto-final-henry/api/models/Classification.js";
export const getCategories = async (req, res) => {
	try {
		const categories = await Classification.findAll();
		res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createClassification = async (req, res) => {
	console.log(req.body);
	const { name, image } = req.body;

	try {

		const nuevaClasificacion = await Classification.findOrCreate({
			where: {name: name},
			defaults:{image: image} 
		})
		if(nuevaClasificacion[1] === false){
			return res.status(500).json({ message: 'This Activity alredy exists' })
		}
		else {
			res.status(200).json({message: 'Category created successfully'});

		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}