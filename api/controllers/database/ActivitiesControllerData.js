import { Activity } from "../../models/Activities.js";
import * as fs from 'fs';
import { Classification } from "../../models/Classification.js";

export const getActivitiesData = async (req, res) =>{
    try {
        //CAMBIAR A PATH RELATIVO
        let dataJson = await Promise.all (fs.readFile('/home/sadnena/pf/proyecto-final-henry/api/data/activities.json', "utf8", (error, data) =>{
            //console.log('AQUI')
            //console.log(data)
            let dataActivities = JSON.parse(data)
            dataActivities.map( async (actividad) => {
                Activity.findOrCreate({
                    where:{
                        name: actividad.name,
                        description: actividad.description,
                        image: actividad.image,
                        price: actividad.price,
                        
                    },
                })
                let clasificacion = await Classification.findAll({where: {name: actividad.clasificacion}})
                Activity.addClasification(clasificacion)
            })
        }))
        let dataActivitiesResult = await Activity.findAll()
        res.status(200).json(dataActivitiesResult)
        
    }catch (error){
        console.log(error.message)
    }
};
