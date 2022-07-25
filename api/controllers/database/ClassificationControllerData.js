import { Classification } from '../../models/Classification.js';
import * as fs from 'fs';
import * as data from '../../data/classification.json' assert {type: "json"};
export const getClassificationData = async () => {
    try {
       //CAMBIAR A PATH RELATIVO
        // let dataJson = fs.readFile('/home/sadnena/pf/proyecto-final-henry/api/data/classification.json', "utf8", (error, data) => {
        
        // })
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


