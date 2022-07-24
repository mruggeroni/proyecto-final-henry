import { Activity } from "../../models/Activities.js";
import * as fs from 'fs';
import { Classification } from "../../models/Classification.js";

export const getActivitiesData = async () =>{
    try {
        
        //CAMBIAR A PATH RELATIVO
        
       
<<<<<<< HEAD
        let dataJson = await Promise.all (fs.readFile('f:/Users/Admin/Desktop/Soy Henry/PF/proyecto-final-henry/api/data/activities.json', "utf8", (error, data) =>{
=======
        let dataJson = await Promise.all (fs.readFile('D:/FinalProject-Henry/proyecto-final-henry/api/data/activities.json', "utf8", (error, data) =>{
>>>>>>> origin/develop
            let dataActivity = JSON.parse(data)
            dataActivity.forEach(async (actividad) => {
                let clasificacion = await Classification.findOne({where: {name: actividad.classification}})
                //console.log(clasificacion)
                clasificacion && await Activity.findOrCreate({
                    where: {name: actividad.name, description: 'Hola soy una actividad', 
                        image: actividad.image, price: actividad.price}
                }) 
                let actividades = await Activity.findOne({where: {name: actividad.name}})
                // console.log(actividades)
                clasificacion.addActivities(actividades)
            })
        }))
        }catch (error){
        console.log(error.message)
    }
};
