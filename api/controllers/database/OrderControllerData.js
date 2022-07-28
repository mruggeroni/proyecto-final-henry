import * as data from '../../data/orders.js';
import { Order } from '../../models/Orders.js';
export const getOrderData = async () => {
    try {
        if (!(await Order.findAndCountAll())?.count) {
            console.log("\n", "uploading database Order", "\n");
            const infoDelJson = data.default;
            infoDelJson.map(({ date, total_order, status,
                userId}) => {
                Order.create({
  
                        date, 
                        total_order, 
                        status,
                        userId 

                });
            });
        };
    }catch (error){
        console.log(error.message);
    };
};