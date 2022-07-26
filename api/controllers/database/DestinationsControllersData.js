//RUTA EXCLUSIVA PARA CARGAR DATOS A LA DATABASE
import { Destination } from "../../models/Destinations.js"
import * as fs from 'fs';
export const getDestinationData = async () =>{
    try {
       //CAMBIAR A PATH RELATIVO
        let dataJson = fs.readFile('/home/bamioezequiel/Desktop/proyecto-final-henry/api/data/destinations.json', "utf8", (error, data) =>{
            let dataDestinations = JSON.parse(data)
            //console.log(error)
            dataDestinations.map((destino) => {
                Destination.findOrCreate({
                    where:
                    {name: destino.name,
                    image: destino.image}
                })
            })
        })
      
    }catch (error){
        console.log(error.message)
    }
};