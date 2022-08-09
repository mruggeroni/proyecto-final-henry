import * as data from '../../data/order_items.js';
import { OrderItem } from '../../models/OrderItems.js';

export const getOrderItemData = async () => {
    try {
        if (!(await OrderItem.findAndCountAll())?.count) {
            console.log("\n", "uploading database OrderItem", "\n");
            const infoDelJson = data.default;
            infoDelJson.map(async({quantity, packageId, orderId}) => {
                const order = await OrderItem.findOrCreate({
                    where: {packageId: packageId,
                        orderId: orderId},
                    defaults:{quantity}

                });
            });
        };
    }catch (error){
        console.log(error.message);
    };
};