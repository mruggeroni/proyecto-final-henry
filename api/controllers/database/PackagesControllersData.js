import { Package } from '../../models/Packages.js';
import { Destination } from '../../models/Destinations.js';
import * as fs from 'fs';
export const getPackageData = async (req, res) =>{
    try {
        
        let dataJson = await Promise.all(
            fs.readFile('api/data/run_resultsasia.json', "utf8", (error, data) =>{
                let dataPackage = JSON.parse(data)
                dataPackage.map(async (paquete) => {
                    let newPaquete = await Package.create({
                        
                        name: paquete.name,
                        price: paquete.price,
                        description: paquete.description,
                        main_image: paquete.main_image,
                        images: paquete.images,
                        featured: paquete.featured,
                        destinations: paquete.id_destination,
                        start_date: paquete.start_date,
                        end_date: paquete.end_date,
                        available: paquete.available,
                        on_sale: paquete.on_sale,
                        region: paquete.region,
                        seasson: paquete.seasson,
                        type: paquete.type,
                        //activities:["Tour de Highlights", "Tour Gastronomía Nacional", "Tour de Monumentos"]
                    })
                    //console.log(paquete.id_destination[0])
                    const destinationfind = await Destination.findOrCreate({ where: { name: paquete.id_destination[0]}})
                    console.log('AQUI')
                    console.log(destinationfind[0])
                    await newPaquete.addDestination(destinationfind[0])
                    return true
                })
                return true
            })
        ) 
        console.log("potato")
        let dataPackageResult = await Package.findAll()
        console.log(dataPackageResult)
        res.status(200).json(dataPackageResult)
        
    }catch (error){
        console.log(error.message)
    }
};
