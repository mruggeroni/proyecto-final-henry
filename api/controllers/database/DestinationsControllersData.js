//RUTA EXCLUSIVA PARA CARGAR DATOS A LA DATABASE
import { Destination } from "../../models/Destinations.js"
import * as fs from 'fs';
// import * as data from '../../data/destinations.json' assert {type: "json"};
import * as data from '../../data/destinations.js';

export const getDestinationData = async () =>{
    try {
        const infoDelJson = data.default;

        infoDelJson.map(({ name, image }) => {
            Destination.findOrCreate({
                where: {
                    name,
                    image,
                },
            });
        });
    }catch (error){
        console.log(error.message);
    };
};


