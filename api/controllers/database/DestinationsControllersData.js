import { Destination } from "../../models/Destinations.js"
import * as data from '../../data/destinations.js';


export const getDestinationData = async () =>{
    try {
        if (!(await Destination.findAndCountAll())?.count) {
            console.log("\n", "uploading database Destinations", "\n");
            const infoDelJson = data.default;

            infoDelJson.map(async({ name, image, region }) => {
                const destino = await Destination.findOrCreate({
                    where: {
                        name,
                    },
                    defaults: {
                        image,
                        region,
                    },
                });
            });
        };
    }catch (error){
        console.log(error.message);
    };
};
