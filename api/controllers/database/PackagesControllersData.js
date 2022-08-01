import { Package } from '../../models/Packages.js';
import { Destination } from '../../models/Destinations.js';
import { Activity } from '../../models/Activities.js';
import * as data from '../../data/JSON_paquetes.js';
import moment from 'moment';


export const getPackageData = async () =>{
    try {
        if (!(await Package.findAndCountAll())?.count) {
            console.log("\n", "uploading database Packages", "\n");
            const infoDelJson = data.default;

            infoDelJson.map(async ({ name, description, main_image, images, price, start_date, end_date, seasson, type, featured, available, on_sale, destinations }) => {
                
				start_date = moment(start_date, 'YYYY-MM-DD');
				end_date = moment(end_date, 'YYYY-MM-DD');

				let newPaquete = await Package.findOrCreate({
                    where:{
                        name, 
                    },
                    defaults: {
                        description, 
                        main_image, 
                        images, 
                        price, 
                        start_date, 
                        end_date, 
                        seasson, 
                        type, 
                        featured, 
                        available, 
                        on_sale,
                    },
                });

                for (let i = 0; i < destinations.length; i++) {
                    const destinationfind = await Destination.findOne({ 
                        where: { 
                            name: destinations[i],
                        },
                    });
                    await newPaquete[0].addDestinations(destinationfind);
                };
                const actividadesfind = await Activity.findOne({
                    where: {
                        name: "Tour de Highlights",
                    },
                });
                const actividadesfind2 = await Activity.findOne({
                    where: {
                        name: "Tour de Museos",
                    },
                });
                await newPaquete[0].addActivities(actividadesfind);
                await newPaquete[0].addActivities(actividadesfind2);
            });
        };
    }catch (error){
        console.log(error.message);
    };
};

