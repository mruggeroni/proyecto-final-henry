import { Package } from '../models/Packages.js';
import { Activity } from '../models/Activities.js';
import { Classification } from '../models/Classification.js';
import { Destination } from '../models/Destinations.js';
import { sequelize } from '../db.js';
import { Op } from "sequelize";

export const getPackagesDetail = async (req, res) => {
	try {
        let idFind = req.params.id
		const packageDetail = await Package.findOne({
            where: {id : idFind},
			include: [{
                model: Activity,
                attributes: ['name'],
                include: {model: Classification, attributes: ['name']}
			}, {model: Destination, attributes:['name']},],
		});
        let packageRegion = packageDetail.region
        let packageName = packageDetail.name
        console.log(packageName)
        const limit = parseInt(req.query.limit) || 3
        const recomendados = await Package.findAll({where: {region: packageRegion,
        name: {[Op.not]: packageName} },
        limit: limit})
            const respuesta = [packageDetail, recomendados]
		res.status(200).json(respuesta);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}