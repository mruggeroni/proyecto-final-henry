import { Activity } from "/home/sadnena/pf/proyecto-final-henry/api/models/Activities.js";
import { Classification } from "/home/sadnena/pf/proyecto-final-henry/api/models/Classification.js";
import * as data from '/home/sadnena/pf/proyecto-final-henry/api/data/activities.js';


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
                console.log(actividades)
                clasificacion.addActivities(actividades);
            });
        };
        }catch (error){
            console.log(error.message);
    };
};
