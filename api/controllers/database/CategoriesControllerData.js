import { Classification } from '../../models/Classification.js';
import * as fs from 'fs';

export const getCategoriesData = async (req, res) => {
    try {
       
        let dataJson = fs.readFile('../../data/classification.json', "utf8", (error, data) => {
        let dataClassification = JSON.parse(data)
        dataClassification.map((categoria) => {
            Classification.create({
                name: categoria.name,
                image: categoria.image
            })
        })
        })
        let dataClassificationResult = await Classification.findAll()
        res.status(200).json(dataClassificationResult)
        
         
    }catch (error){
        console.log(error.message)
    }
}


