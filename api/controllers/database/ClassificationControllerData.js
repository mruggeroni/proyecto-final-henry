import { Classification } from '../../models/Classification.js';
import * as fs from 'fs';
import * as data from '../../data/classification.json' assert {type: "json"};

export const getClassificationData = async () => {
    try {
        let dataClassification = data.default
        dataClassification.map((categoria) => {
            Classification.findOrCreate({
                where: {name: categoria.name, image: categoria.image }
                
            })
        })
        let dataClassificationResult = await Classification.findAll()
        console.log('POTATO')
        console.log(dataClassificationResult)

         
    }catch (error){
        console.log(error.message)
    }
}


