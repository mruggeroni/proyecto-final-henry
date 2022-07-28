import { Package } from "../models/Packages.js";
import { Destination } from "../models/Destinations.js";
import { Activity } from "../models/Activities.js";
import { Classification } from "../models/Classification.js";
import { sequelize } from "../db.js";
import { Op } from "sequelize";

export const getFeaturedPackages = async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;

  try {
    const packages = await Package.findAll({
      where: {
        featured: true,
      },
      include: [
        {
          model: Activity,
          attributes: ["name", "price", "description", "image"],
          include: {
            model: Classification,
            attributes: ["name", "image"],
          },
        },
        {
          model: Destination,
          attributes: ["name", "image", "region"],
        },
      ],
      limit: limit,
      order: [["id", "ASC"]],
    });
    packages.length < 1
      ? res.status(200).json({ message: "There are no featured packages." })
      : res.status(200).json(packages);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// export const createPackage = async (req, res) => {
//   const {
//     name,
//     description,
//     main_image,
//     images,
//     price,
//     featured,
//     available,
//     on_sale,
//     activities,
//     destinations,
//     start_date,
//     end_date,
//     region,
//     seasson,
//     type,
//   } = req.body;
//   console.log("PROBANDO");
//   try {
//     const newClassification = [];
//     for (let i = 0; i < activities.length; i++) {
//       let nameC = activities[i].classification.name;
//       let imageC = activities[i].classification.image;
//       let clasificacionCreada = await Classification.findOrCreate({
//         where: { name: nameC },
//         defaults: {
//           image: imageC,
//         },
//       });
//       newClassification.push(clasificacionCreada[0]);
//     }
//     const newDestination = [];
//     for (let i = 0; i < destinations.length; i++) {
//       const destinosCreados = await Destination.findOrCreate({
//         where: { name: destinations[i].name },
//         defaults: {
//           image: destinations[i].image,
//         },
//       });
//       newDestination.push(destinosCreados[0]);
//     }
//     const newActivities = [];
//     for (let i = 0; i < activities.length; i++) {
//       const actividadesCreadas = await Activity.findOrCreate({
//         where: { name: activities[i].name },
//         defaults: {
//           description: activities[i].description,
//           image: activities[i].image,
//           price: activities[i].price,
//         },
//       });
//       const clasificacionEncontrada = await Classification.findOne({
//         where: { name: activities[i].classification.name },
//       });
//       await clasificacionEncontrada.addActivities(actividadesCreadas[0]);
//       newActivities.push(actividadesCreadas[0]);
//     }
//     const newPackage = await Package.findOrCreate({
//       where: {
//         name: name,
//         description: description,
//         main_image: main_image,
//         images: images,
//         price: price,
//         featured: featured,
//         available: available,
//         on_sale: on_sale,
//         start_date: start_date,
//         end_date: end_date,
//         region: region,
//         seasson: seasson,
//         type: type,
//       },
//     });
//     for (let i = 0; i < newActivities.length; i++) {
//       await newPackage[0].addActivities(newActivities[i]);
//     }
//     for (let i = 0; i < newDestination.length; i++) {
//       await newPackage[0].addDestinations(newDestination[i]);
//     }
//     console.log(newPackage);
//     res.json({ message: "Package created successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const createPackage = async (req, res) => {
//   const {
//     name,
//     description,
//     main_image,
//     images,
//     price,
//     featured,
//     available,
//     on_sale,
//     activities,
//     destinations,
//     start_date,
//     end_date,
//     seasson,
//     type,
//   } = req.body;
//   console.log("PROBANDO");

//   try {
//     const newDestination = [];
//     if (destinations) {
//       for (let i = 0; i < destinations.length; i++) {
//         const destinosCreados = await Destination.findOrCreate({
//           where: {
//             name: destinations[i].name,
//           },
//           defaults: {
//             image: destinations[i].image,
//             region: destinations[i].region,
//           },
//         });
//         newDestination.push(destinosCreados[0]);
//       }
//     }
//     const newActivities = [];
//     if (activities) {
//       for (let i = 0; i < activities.length; i++) {
//         const actividadesCreadas = await Activity.findOrCreate({
//           where: {
//             name: activities[i].name,
//           },
//           defaults: {
//             description: activities[i].description,
//             image: activities[i].image,
//             price: activities[i].price,
//           },
//         });
//         if (activities.classification) {
//           const clasificacionEncontrada = await Classification.findOrCreate({
//             where: {
//               name: activities[i].classification.name,
//             },
//             defaults: {
//               image: activities[i].classification.image,
//             },
//           });
//           await clasificacionEncontrada[0].addActivities(actividadesCreadas[0]);
//           newActivities.push(actividadesCreadas[0]);
//         }
//       }
//     }
//     const newPackage = await Package.findOrCreate({
//       where: {
//         name: name,
//       },
//       defaults: {
//         description: description,
//         main_image: main_image,
//         images: images,
//         price: price,
//         featured: featured,
//         available: available,
//         on_sale: on_sale,
//         start_date: start_date,
//         end_date: end_date,
//         seasson: seasson,
//         type: type,
//       },
//     });
//     for (let i = 0; i < newActivities.length; i++) {
//       await newPackage[0].addActivities(newActivities[i]);
//     }
//     for (let i = 0; i < newDestination.length; i++) {
//       await newPackage[0].addDestinations(newDestination[i]);
//     }
//     console.log(newPackage);
//     if (newPackage[1] === false) {
//       res.status(400).json({ message: "This Package alredy exists" });
//     } else {
//       res.status(201).json({ message: "Package created successfully" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const createPackage = async (req, res) => {
  try {
    const {
      name,
      description,
      main_image,
      images,
      price,
      start_date,
      end_date,
      region,
      seasson,
      type,
      featured,
      available,
      on_sale,
      activities,
      destinations,
    } = req.body;

    let packageCreated = await Package.findOrCreate({
      where: { name: name },
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
    console.log(packageCreated);
    let activitiesDb = await Activity.findAll({ where: { name: activities } });
    let destinationsDb = await Destination.findAll({
      where: { name: destinations },
    });
    if (packageCreated[1] === false) {
      res.status(400).json({ message: "This package alredy exists" });
    } else {
      packageCreated[0].setActivities(activitiesDb);
      packageCreated[0].setDestinations(destinationsDb);

      return res.json({ message: "Package created successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const putPackage = async (req, res) => {
  try {
    const nuevopaquete = req.body;
    const { activities, destinations } = req.body;
    let id = req.params.id;
    const updateado = await Package.update(nuevopaquete, {
      where: {
        id,
      },
    });
    const encontrado = await Package.findOne({
      where: { id },
    });
    if (destinations) {
      console.log(encontrado);
      let destinationUpdate = [];
      for (let i = 0; i < destinations.length; i++) {
        const destino = await Destination.findOrCreate({
          where: {
            name: destinations[i].name,
          },
          defaults: {
            image: destinations[i].image,
            region: destinations[i].region,
          },
        });
        destinationUpdate.push(destino[0]);
        console.log(destino);
      }
      await encontrado.setDestinations(destinationUpdate);
    }
    if (activities) {
      let actividadUpdate = [];
      for (let i = 0; i < activities.length; i++) {
        const actividad = await Activity.findOrCreate({
          where: {
            name: activities[i].name,
          },
          defaults: {
            image: activities[i].image,
            description: activities[i].description,
            price: activities[i].price,
          },
        });
        actividadUpdate.push(actividad[0]);
        console.log(actividad);
        if (activities[i].classification) {
          const clasificacion = await Classification.findOrCreate({
            where: {
              name: activities[i].classification.name,
            },
            defaults: {
              image: activities[i].classification.image,
            },
          });
          const actividadEncontrada = await Activity.findOne({
            where: {
              name: activities[i].name,
            },
          });
          await clasificacion[0].setActivities(actividadEncontrada);
          console.log("HERE");
          console.log(clasificacion);
        }
      }
      await encontrado.setActivities(actividadUpdate);
    }
    console.log(updateado);
    res.status(200).json({ message: "Package updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.query;
    const deleted = await Package.findByPk(id);

    deleted &&
      (await Package.destroy({
        where: {
          id,
        },
      }));
    deleted
      ? res.status(200).send("Package deleted successfully")
      : res.status(200).send("The package was already deleted");
  } catch (error) {
    res.status(400).send({ data: error.message });
  }
};

export const getDeletedPackages = async (req, res) => {
  try {
    const deleted = await Package.findAll({
      where: {
        destroyTime: {
          [Op.ne]: null,
        },
      },
      paranoid: false,
    });
    deleted.length
      ? res.status(200).send(deleted)
      : res.status(200).send("No deleted packages found");
  } catch (error) {
    res.status(400).send({ data: error.message });
  }
};

export const getTypes = async (req, res) => {
  try {
    const packageTypes = await Package.findAll();
    const uniquePackageTypes = [];
    packageTypes?.forEach((p) => {
      !uniquePackageTypes.includes(p.type) && uniquePackageTypes.push(p.type);
    });
    res.status(200).send(uniquePackageTypes);
  } catch (error) {
    res.status(404).send({ data: error.message });
  }
};

export const getOn_sale = async (req, res) => {
  try {
    const filteredPackages = await Package.findAll({
      where: {
        on_sale: {
          [Op.gt]: 0,
        },
      },
      order: sequelize.random(),
      limit: 3,
    });
    res.status(200).send(filteredPackages);
  } catch (error) {
    res.status(404).send({ data: error.message });
  }
};

export const patchPackage = async (req, res) => {
  const id = parseInt(req.params.id);
  const { featured, available, on_sale } = req.body;

  try {
    const packageToModify = await Package.findByPk(id);
    await Package.update(
      {
        featured: featured ? featured : packageToModify.featured,
        available: available ? available : packageToModify.available,
        on_sale: on_sale ? on_sale : packageToModify.on_sale,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "Successfully Modified Package" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
