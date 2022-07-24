// <<<<<<< HEAD
// import { Package } from "../models/Packages.js";
// import { Classification } from "../models/Classification.js";
// import { Activity } from "../models/Activities.js";
// import { Destination } from "../models/Destinations.js";

// export const getPackages = async (req, res) => {
//   try {
//     let price;
//     req.query.price ? (price = req.query.price) : (price = "DESC");
//     const packages = await Package.findAll({
//       include: [
//         {
//           model: Activity,
//           attributes: ["name"],
//           include: { model: Classification, attributes: ["name"] },
//         },
//         { model: Destination, attributes: ["name"] },
//       ],
//       order: [["price", price]],
//     });
//     res.status(200).json(packages);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const getFeaturedPackages = async (req, res) => {
//   try {
//     const packages = await Package.findAll({
//       where: {
//         featured: true,
//       },
//       //include: {
//       //	model: Classification,
//       //	attributes: ['name'],
//       //}
//     });
//     packages.length < 1
//       ? res.status(200).json({ message: "There are no featured packages." })
//       : res.status(200).json(packages);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const createPackage = async (req, res) => {
//   console.log(req.body);
//   const {
//     name,
//     description,
//     main_image,
//     images,
//     price,
//     featured,
//     available,
//     on_sale,
//     categoryId,
//   } = req.body;

//   try {
//     const newPackage = await Package.create({
//       name,
//       description,
//       main_image,
//       images,
//       price,
//       featured,
//       available,
//       on_sale,
//       categoryId,
//     });
//     res.json({ message: "Package created successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// =======
import { Package } from "../models/Packages.js";
import { Classification } from "../models/Classification.js";
import { sequelize } from "../db.js";
import { Op } from "sequelize";
import * as fs from "fs";

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.findAll({
      include: {
        model: Classification,
        attributes: ["name"],
      },
    });
    res.status(200).json(packages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.findAll({
      where: {
        featured: true,
      },
      //include: {
      //	model: Classification,
      //	attributes: ['name'],
      //}
    });
    packages.length < 1
      ? res.status(200).json({ message: "There are no featured packages." })
      : res.status(200).json(packages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPackage = async (req, res) => {
  console.log(req.body);
  const {
    name,
    description,
    main_image,
    images,
    price,
    featured,
    available,
    on_sale,
    categoryId,
  } = req.body;

  try {
    const newPackage = await Package.create({
      name,
      description,
      main_image,
      images,
      price,
      featured,
      available,
      on_sale,
      categoryId,
    });
    res.json({ message: "Package created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

    // const data = fs.readFileSync('D:/FinalProject-Henry/proyecto-final-henry/api/data/JSON_paquetes.json', 'utf8');
    // const uniquePackageTypes = []
    // JSON.parse(data)?.forEach(p => {
    // 	!uniquePackageTypes.includes(p.type) && uniquePackageTypes.push(p.type)
    // });

    // res.status(200).json(uniquePackageTypes)
  } catch (error) {
    res.status(400).send({ data: error.message });
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
    res.status(400).send({ data: error.message });
  }
};
// <<<<<<< HEAD
// =======
// >>>>>>> 831c90d3f41ac20f1ec9ea1dffde9275af87f6b7
// >>>>>>> origin/develop
// };
