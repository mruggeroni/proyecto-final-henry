import { Activity } from "../../models/Activities.js";
import * as fs from 'fs';

export const getActivitiesData = async (req, res) =>{
    try {
        let dataJson = fs.readFile('api/data/activities.json', "utf8", (error, data) =>{
            let dataActivities = JSON.parse(data)
            dataActivities.map((actividad) => {
                Activity.create({
                    
                    name: actividad.name,
                    description: actividad.description,
                    image: actividad.image,
                    price: actividad.price,
                    classification: actividad.classification
                })
            })
        })
        let dataActivitiesResult = await Activity.findAll()
        res.status(200).json(dataActivitiesResult)
        
    }catch (error){
        console.log(error.message)
    }
};
