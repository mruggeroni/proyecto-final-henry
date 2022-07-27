
import { Classification } from "/home/sadnena/pf/proyecto-final-henry/api/models/Classification.js";
export const getClassification = async (req, res) => {
	try {
		const classification = await Classification.findAll();
		res.status(200).json(classification);
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
export const putClassification = async (req, res) => {
	try {
		let nuevaClassification = req.body
		let FindId = req.params.id
		const updateado = await Classification.update(nuevaClassification, {
			where: {
				id: FindId
			}})
		res.status(200).json({message:'Classification updated'})
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

}