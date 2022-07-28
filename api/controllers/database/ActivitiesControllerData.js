import { Activity } from "../../models/Activities.js";
import { Classification } from "../../models/Classification.js";
import * as data from '../../data/activities.js';


export const getActivitiesData = async () =>{
    try {
        if (!(await Activity.findAndCountAll())?.count) {
            console.log("\n", "uploading database Activities", "\n");
            const infoDelJson = data.default;

            infoDelJson.forEach(async ({ name, image, price, classification }) => {
                let clasificacion = await Classification.findOne({
                    where: {
                        name: classification,
                    },
                });
                console.log(clasificacion)
                clasificacion && await Activity.findOrCreate({
                    where: {
                        name, 
                    },
                    defaults: {
                        description: 'Disfruta de las mejores actividades para nuestros paquetes de viajes.', 
                        image, 
                        price,
                    },
                });
                let actividades = await Activity.findOne({
                    where: {
                        name,
                    },
                });
                clasificacion?.addActivities(actividades);
            });
        };
        }catch (error){
            console.log(error.message);
    };
};
