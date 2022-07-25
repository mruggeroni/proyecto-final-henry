import { Classification } from '../../models/Classification.js';
// import * as data from '../../data/classification.json' assert {type: "json"};
import * as data from '../../data/classification.js';


export const getClassificationData = async () => {
    try {
        const infoDelJson = data.default;

        infoDelJson.map(({ name, image }) => {
            Classification.findOrCreate({
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


