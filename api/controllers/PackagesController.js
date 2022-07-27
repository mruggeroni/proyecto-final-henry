
import { Package } from '../models/Packages.js';
import { Classification } from '../models/Classification.js'
import { Activity } from '../models/Activities.js';
import { Destination } from '../models/Destinations.js';

export const getPackages = async (req, res) => {
	try {
		let price 
		req.query.price? price = req.query.price: price = 'DESC'
		const packages = await Package.findAll({
			include: [{
                model: Activity,
                attributes: ['name', 'price', 'description', 'image'],
                include: {model: Classification, attributes: ['name', 'image']}
			}, {model: Destination, attributes:['name', 'image']}],
			order: [['price', price]]
		});
		res.status(200).json(packages);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const getFeaturedPackages = async (req, res) => {
	const limit = parseInt(req.query.limit) || 3;
	try {
		const packages = await Package.findAll({
			where: {
				featured: true,
			},
			include: [{
                model: Activity,
                attributes: ['name', 'price', 'description', 'image'],
                include: {model: Classification, attributes: ['name', 'image']}
			}, {model: Destination, attributes:['name', 'image']}],
			limit: limit,
			order: [
				['id', 'ASC']
			]
		});
		packages.length < 1
		? res.status(200).json({ message: 'There are no featured packages.' })
		: res.status(200).json(packages);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createPackage = async (req, res) => {
	const { name, description, main_image, images, price, featured, available, on_sale,
	activities, destinations, start_date, end_date, region, seasson, type } = req.body;
		console.log('PROBANDO')
	try {

		const newDestination = []
		if (destinations){
			for(let i=0; i< destinations.length; i++){
				const destinosCreados = await Destination.findOrCreate({where:{name: destinations[i].name 
					},	defaults: {
						image: destinations[i].image
					  }}
	)
					newDestination.push(destinosCreados[0])
			}}
			const newActivities = []
			if (activities){
				
			for(let i=0; i< activities.length; i++){
			const actividadesCreadas = await Activity.findOrCreate({where: {name: activities[i].name}, defaults: {
				description: activities[i].description, 
				image: activities[i].image, price: activities[i].price
				  }})
				if(activities.classification){
					const clasificacionEncontrada = await Classification.findOrCreate({where: {name: activities[i].classification.name}, 
						defaults: {image: activities[i].classification.image}})
				await clasificacionEncontrada[0].addActivities(actividadesCreadas[0])
			newActivities.push(actividadesCreadas[0])
			}}}
		const newPackage = await Package.findOrCreate({ where:{
			name:name,description: description, main_image: main_image, images: images, 
			price: price, featured: featured, available : available, on_sale: on_sale,
			start_date: start_date, end_date: end_date, region: region, seasson: seasson, type: type}, 
		});
		for(let i=0; i< newActivities.length; i++){
			await newPackage[0].addActivities(newActivities[i])
		}
		for(let i=0; i< newDestination.length; i++){
			await newPackage[0].addDestinations(newDestination[i])
		}
		console.log(newPackage)
		if(newPackage[1] === false){
			res.status(500).json({message: 'This Package alredy exists'})
		}else{res.json({message: 'Package created successfully'});}
		
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}}
export	const putPackage = async (req, res)=>{
	try {
		const nuevopaquete =req.body
		const {activities, destinations} = req.body
		let id = req.params.id	
		const updateado = await Package.update(nuevopaquete, {
			where: {
				id,
			}})
			const encontrado = await  Package.findOne({where: {id}})
		if (destinations){
		console.log(encontrado)
		let destinationUpdate = []
		for(let i=0; i< destinations.length; i++){
			const destino = await Destination.findOrCreate({where: {name: destinations[i].name},
				defaults: {
					image: destinations[i].image
			  	}})
			destinationUpdate.push(destino[0])
			console.log(destino)
		}
		await encontrado.setDestinations(destinationUpdate)
		}	
		if (activities){
			let actividadUpdate = []
		for(let i=0; i< activities.length; i++){
			const actividad = await Activity.findOrCreate({where: {name: activities[i].name},
				defaults: {
					image: activities[i].image,
					description: activities[i].description ,
					price: activities[i].price
			  	}})
			actividadUpdate.push(actividad[0])
			console.log(actividad)
			if(activities[i].classification){
				const clasificacion = await Classification.findOrCreate({where: {name: activities[i].classification.name},
					defaults: {
						image: activities[i].classification.image,
					  }})
				const actividadEncontrada = await Activity.findOne({where: {name: activities[i].name}})
				await clasificacion[0].setActivities(actividadEncontrada)
				console.log('HERE')
				console.log(clasificacion)
			}
		}
		await encontrado.setActivities(actividadUpdate)
		}
		console.log(updateado)
		res.json({message: 'Package updated successfully'})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
	
export const getTypes = async (req, res) => {
		try {
			const packageTypes = await Package.findAll()
			const uniquePackageTypes = []
			packageTypes?.forEach(p => {
				!uniquePackageTypes.includes(p.type) && uniquePackageTypes.push(p.type)
			});
			res.status(200).send(uniquePackageTypes)
	
			// const data = fs.readFileSync('D:/FinalProject-Henry/proyecto-final-henry/api/data/JSON_paquetes.json', 'utf8');
			// const uniquePackageTypes = []
			// JSON.parse(data)?.forEach(p => {
			// 	!uniquePackageTypes.includes(p.type) && uniquePackageTypes.push(p.type)
			// });
		
		// res.status(200).json(uniquePackageTypes)
	
		} catch (error) {
			res.status(400).send({ data: error.message })
		}
	}
	
export const getOn_sale = async (req, res) => {
		try {
			const filteredPackages = await Package.findAll({
				where:{
					on_sale: {
						[Op.gt]: 0
					}
				},
				order: sequelize.random(),
				limit: 3
			})
			res.status(200).send(filteredPackages)
		} catch (error) {
			res.status(400).send({ data: error.message })
		}
	}


