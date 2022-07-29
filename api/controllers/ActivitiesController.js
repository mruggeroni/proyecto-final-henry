
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
	const { name, description, image, price, classification} = req.body;
	try {
		const nuevaActividad = await Activity.findOrCreate({
			where: {name: name},
			defaults: {name, description, image, price}
			
		})
		const clasificacion = await Classification.findOne({where: {name: classification}})
		console.log(clasificacion)
		const nuv = await clasificacion.addActivities(nuevaActividad[0])
		console.log(nuv)
		if(nuevaActividad[1]=== false){
			return res.status(500).json({ message: 'This Activity alredy exists'})
		} else {
			res.status(200).json({message: 'Activity created successfully'})
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}
export const putActivity = async (req, res) => {
	try {
	  let nuevactividad = req.body
	  let FindId = req.params.id
	  const updateado = await Activity.update(nuevactividad, {
		where: {
		  id: FindId
		}})
		res.status(200).json({message:'Activity updated'})
	} catch (error) {
	  return res.status(500).json({ message: error.message });
	}
  
	  
  }

