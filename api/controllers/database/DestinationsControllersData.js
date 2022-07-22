//RUTA EXCLUSIVA PARA CARGAR DATOS A LA DATABASE
import { Destination } from "../../models/Destinations.js"
import * as fs from 'fs';
export const getDestinationData = async (req, res) =>{
    try {
       
        let dataJson = fs.readFile('../../data/destinations.json', "utf8", (error, data) =>{
            let dataDestinations = JSON.parse(data)
            console.log(error)
            dataDestinations.map((destino) => {
                Destination.create({
                    
                    name: destino.name,
                    image: destino.image
                })
            })
        })
        let dataDestinationsResult = await Destination.findAll()
        res.status(200).json(dataDestinationsResult)
      
    }catch (error){
        console.log(error.message)
    }
};


