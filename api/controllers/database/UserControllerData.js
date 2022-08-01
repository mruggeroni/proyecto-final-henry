import * as data from '../../data/users.js';
import { User } from '../../models/Users.js';

export const getUserData = async () => {
    try {
        if (!(await User.findAndCountAll())?.count) {
            console.log("\n", "uploading database Users", "\n");
            const infoDelJson = data.default;
            infoDelJson.map(({ first_name, last_name,
                email, phone, city, state, postal_code, is_admin,
                photo, created_date, update_date, destroyTime }) => {
                User.findOrCreate({
                    where: {
                        email, 
                    },
                    defaults: {
                        first_name, 
                        last_name,
                        phone,
                        city, 
                        state, 
                        postal_code, 
                        is_admin,
                        photo, 
                    },
                });
            });
        };
    }catch (error){
        console.log(error.message);
    };
};