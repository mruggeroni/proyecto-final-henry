import { Classification } from '../../models/Classification.js';
import * as data from '../../data/classification.json' assert {type: "json"};


export const getClassificationData = async () => {
    try {
        const infoDelJson = data.default;

        infoDelJson.map((categoria) => {
            Classification.findOrCreate({
                where: {name: categoria.name, image: categoria.image }
                
            })
        })
                    
    }catch (error){
        console.log(error.message)
    }
}


