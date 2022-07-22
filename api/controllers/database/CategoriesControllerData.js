import { Classification } from '../../models/Classification.js';
import * as fs from 'fs';

export const getCategoriesData = async (req, res) => {
    try {
       //CAMBIAR A PATH RELATIVO
        let dataJson = fs.readFile('/home/sadnena/pf/proyecto-final-henry/api/data/classification.json', "utf8", (error, data) => {
        let dataClassification = JSON.parse(data)
        dataClassification.map((categoria) => {
            Classification.findOrCreate({
                where: {name: categoria.name, image: categoria.image }
                
            })
        })
        })
        let dataClassificationResult = await Classification.findAll()
        res.status(200).json(dataClassificationResult)
        
         
    }catch (error){
        console.log(error.message)
    }
}


