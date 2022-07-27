import { Package } from "../../models/Packages.js";
import { Destination } from "../../models/Destinations.js";
import * as fs from "fs";
import { Activity } from "../../models/Activities.js";
// import * as data from '../../data/JSON_paquetes.json' assert {type: "json"};
import * as data from "../../data/JSON_paquetes.js";

export const getPackageData = async () => {
  try {
    const infoDelJson = data.default;

    infoDelJson.map(async (paquete) => {
      let newPaquete = await Package.findOrCreate({
        where: {
          name: paquete.name,
          price: paquete.price,
          description: paquete.description,
          images: paquete.images,
          on_sale: paquete.on_sale,
          region: paquete.region,
          seasson: paquete.seasson,
          type: paquete.type,
          start_date: paquete.start_date,
          end_date: paquete.end_date,
          featured: paquete.featured,
          main_image: paquete.main_image,
          available: paquete.available,
        },
      });

        infoDelJson.map(async ({ name, description, main_image, images, price, 
            start_date, end_date, seasson, type, featured, available, on_sale, destinations }) => {
            let newPaquete = await Package.findOrCreate({
                where:{
                name,   
                },
                defaults: {
                    description, 
                    main_image, 
                    images, 
                    price, 
                    start_date, 
                    end_date,  
                    seasson, 
                    type, 
                    featured, 
                    available, 
                    on_sale,
                },
            })

            for (let i=0; i< destinations.length; i++){

                        const destinationfind = await Destination.findOne({ where: { name: destinations[i]}})
                        await newPaquete[0].addDestinations(destinationfind)
                    }
            const actividadesfind = await Activity.findOne({where: {name: "Tour de Highlights" }})
            const actividadesfind2 = await Activity.findOne({where: {name: "Tour de Museos" }})
            await newPaquete[0].addActivities(actividadesfind)
            await newPaquete[0].addActivities(actividadesfind2)
        })
    }catch (error){
        console.log(error.message)
    }
};
