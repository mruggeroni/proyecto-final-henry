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
  } catch (error) {
    console.log(error.message);
  }
};
