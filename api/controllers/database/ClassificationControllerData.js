import { Classification } from '../../models/Classification.js';
import * as fs from 'fs';
import * as data from '../../data/classification.json' assert {type: "json"};
export const getClassificationData = async () => {
    try {
        let dataJson = fs.readFile('/home/sadnena/pf/proyecto-final-henry/api/data/classification.json', "utf8", (error, data) =>{
            let dataClassification = JSON.parse(data)
            dataClassification.map((categoria) => {
            Classification.findOrCreate({
                where: {name: categoria.name, image: categoria.image }
                
            })
        })
        })
            
  

         
    }catch (error){
        console.log(error.message)
    }
}


