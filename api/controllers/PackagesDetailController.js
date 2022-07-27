import { Package } from '../models/Packages.js';
import { Destination } from '../models/Destinations.js';
import { Activity } from '../models/Activities.js';
import { Classification } from '../models/Classification.js';
import { sequelize } from '../db.js';
import { Op } from "sequelize";


export const getPackagesDetail = async (req, res) => {
	try {
        let idFind = parseInt(req.params.id);

		const packageDetail = await Package.findByPk(idFind, {
			include: [{
                model: Activity,
                attributes: [
                    'name', 
                    'price', 
                    'description', 
                    'image',
                ],
                include: {
                    model: Classification, 
                    attributes: [
                        'name', 
                        'image',
                    ],
                },
			}, {
                model: Destination, 
                attributes:[
                    'name', 
                    'image', 
                    'region',
                ]}],
		});
        let packageRegion = [];
        for (let i = 0; i < packageDetail.destinations.length; i++) {
            packageRegion.push(packageDetail.destinations[i].region);
        };
        let packageName = packageDetail.name;
        const limit = parseInt(req.query.limit) || 3;
        const recomendados = await Package.findAll({
            where: { 
                name: {
                    [Op.not]: packageName,
                },
            },
            limit: limit, 
            include:{
                model: Destination,
                where: {
                    region: {
                        [Op.in]: packageRegion,
                    },
                },
            },
        });
        const respuesta = [packageDetail, recomendados];
		res.status(200).json(respuesta);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	};
};
