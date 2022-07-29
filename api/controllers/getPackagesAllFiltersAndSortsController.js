import { Package } from '../models/Packages.js';
import { Destination } from '../models/Destinations.js';
import { Activity } from '../models/Activities.js';
// import { Classification } from '../models/Classification.js';
import sequelize, { Op } from 'sequelize';


export const getPackages = async (req, res) => {
    const { limitRender } = req.params;
    const { page, priceSort, durationSort, type, region, destination, dateMin, dateMax, available } = req.query;
    const { priceFilterMin, priceFilterMax/* , dateMin, dateMax */, durationFilterMin, durationFilterMax } = req.body;

    try {
        const limitRend = parseInt(limitRender) || 12,
            pag = parseInt(page) || 1,
            priceS = priceSort?.toLowerCase(),
            durationS = durationSort?.toLowerCase(),
            durationFilterExist = (durationFilterMin && durationFilterMax) ? true : false;
        
		const packages = await Package.findAll({
            include: [
                {
                    model: Destination,
                    attributes: ['name', "region"],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: Activity,
                    attributes: ['name', "price"],
                    through: {
                        attributes: [],
                    },
                },
            ],
            // ['where']: sequelize.where(sequelize.col('destinations', sequelize.col('name')), destination),
            where: {
				available: available === 'true' ? 
                    true : 
                        available === 'false' ? 
                        false : {
                            [Op.or]: [{
								[Op.is]: true,
							}, {
								[Op.is]: false,
							}],
                        },
                type: type ? type : {
                    [Op.not]: null,
                },
                // region: region ? region : {
                //     [Op.not]: null,
                // },
                // include: {
                //     model: Destination,
                //     where: {
                //         name: destination,
                //     },
                // },
                // destinations: destination ? [
                //     sequelize.literal(`(
                //         SELECT * 
                //         FROM ${Package} AS p
                //         INNER JOIN ${Destination} AS d ON p.id = d.id 
                //         WHERE
                //             d.name = ${destination}
                //     )`)
                // ] : {
                //     [Op.not]: null,
                // },
                // [destination? 'destinations' : ""]: sequelize.fn(),
                // [destination? 'destinations' : ""]: sequelize.where(sequelize.col('name')),
                price: (priceFilterMin && priceFilterMax) ? {
                    [Op.and]: {
                        [Op.gte]: priceFilterMin,
                        [Op.lte]: priceFilterMax,
                    },
                } : {
                    [Op.not]: null,
                },
                start_date: (dateMin && dateMax) ? {
                    [Op.and]: {
                        [Op.gte]: dateMin,
                        [Op.lte]: dateMax,
                    }
                } : {
                    [Op.not]: null,
                },
                // duration: (durationFilterMin && durationFilterMax)? {
                //     [Op.and]: {
                //         [Op.gte]: durationFilterMin,
                //         [Op.lte]: durationFilterMax,
                //     },
                // } : {
                //     [Op.not]: null,
                // },
			},
			[(priceSort/*  || durationSort */) && 'order']: [
				priceS === 'asc' ? 
                ['price', 'ASC'] : 
                    priceS === 'desc' ? 
                    ['price', 'DESC'] : 
                        // durationS === 'asc' ? 
                        // ['duration', 'ASC'] : 
                        //     durationS === 'desc' ? 
                        //     ['duration', 'DESC'] : 
                                null,
                // durationS === 'asc' ? 
                // ['duration', 'ASC'] : 
                //     durationS === 'desc' ? 
                //     ['duration', 'DESC'] : 
                //         null,
			],
            offset: limitRend * (pag - 1),
			limit: limitRend,
            // attributes: [
            //     'id',
            //     'name',
            //     'main_image',
            //     'price',
            //     'seasson',
            //     'type',
            //     'featured',
            //     'on_sale',
            // ],
		});

        let packagesResult = packages.filter(p => {
            let durationF = durationFilterExist ? 
                ((durationFilterMin <= p.duration) && (p.duration <= durationFilterMax)) :
                true;
            return durationF && p.destinations.some(d => {
                let regionF = region ? (d.region === region) : true;
                let destinationF = destination ? (d.name === destination) : true;
                return regionF && destinationF;
            });
        });
        packagesResult = ((durationS === 'asc') || (durationS === 'desc')) ? 
            packagesResult.sort((p1, p2) => {
                let order = durationS === 'asc' ? 
                    p1.duration - p2.duration : 
                    p2.duration - p1.duration;
                return !priceS ?
                    order :
                        (p1.price === p2.price) ?
                        order :
                        true;
                }) : 
            packagesResult;

		res.status(200).json(packagesResult);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	};
};