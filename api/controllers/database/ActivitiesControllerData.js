import { Activity } from "../../models/Activities.js";
import { Classification } from "../../models/Classification.js";
// import * as data from '../../data/activities.json' assert {type: "json"};
import * as data from '../../data/activities.js';


export const getActivitiesData = async () =>{
    try {
        const infoDelJson = data.default;
        infoDelJson.forEach(async ({ name, image, price, classification }) => {
            let clasificacion = await Classification.findOne({
                where: {
                    name: classification,
                },
            });
            clasificacion && await Activity.findOrCreate({
                where: {
                    name, 
                    description: 'Hola soy una actividad', 
                    image, 
                    price,
                },
            });
            let actividades = await Activity.findOne({
                where: {
                    name,
                },
            });
            clasificacion.addActivities(actividades);
        });
        }catch (error){
        console.log(error.message);
    };
};
