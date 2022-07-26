import { Activity } from "../../models/Activities.js";

import * as fs from "fs";

import { Classification } from "../../models/Classification.js";
// import * as data from '../../data/activities.json' assert {type: "json"};
import * as data from "../../data/activities.js";

export const getActivitiesData = async () => {
  try {
    const infoDelJson = data.default;
    infoDelJson.forEach(async (actividad) => {
      let clasificacion = await Classification.findOne({
        where: { name: actividad.classification },
      });

<<<<<<< HEAD
    let dataJson = await Promise.all(
      fs.readFile(
        "/home/bamioezequiel/Desktop/proyecto-final-henryapi/data/activities.json",
        "utf8",
        (error, data) => {
          let dataActivity = JSON.parse(data);
          dataActivity.forEach(async (actividad) => {
            let clasificacion = await Classification.findOne({
              where: { name: actividad.classification },
            });
            //console.log(clasificacion)
            clasificacion &&
              (await Activity.findOrCreate({
                where: {
                  name: actividad.name,
                  description: "Hola soy una actividad",
                  image: actividad.image,
                  price: actividad.price,
                },
              }));
            let actividades = await Activity.findOne({
              where: { name: actividad.name },
            });
            // console.log(actividades)
            clasificacion.addActivities(actividades);
          });
        }
      )
    );
=======
      clasificacion &&
        (await Activity.findOrCreate({
          where: {
            name: actividad.name,
            description: "Hola soy una actividad",
            image: actividad.image,
            price: actividad.price,
          },
        }));

      let actividades = await Activity.findOne({
        where: { name: actividad.name },
      });
      clasificacion.addActivities(actividades);
    });
>>>>>>> develop
  } catch (error) {
    console.log(error.message);
  }
};
