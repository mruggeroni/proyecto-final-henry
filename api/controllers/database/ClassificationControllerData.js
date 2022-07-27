import { Classification } from '../../models/Classification.js';
import * as data from '../../data/classification.js';


export const getClassificationData = async () => {
    try {
        if (!(await Classification.findAndCountAll())?.count) {
            console.log("\n", "uploading database Classifications", "\n");
            const infoDelJson = data.default;

            infoDelJson.map(({ name, image }) => {
                Classification.findOrCreate({
                    where: {
                        name, 
                    },
                    defaults: {
                        image, 
                    },
                });
            });
        };
    }catch (error){
        console.log(error.message);
    };
};
