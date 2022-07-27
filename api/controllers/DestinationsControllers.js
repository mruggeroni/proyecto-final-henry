import { Destination } from "../models/Destinations.js";
// import * as fs from 'fs';

export const getDestination = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.status(200).send(destinations);
    // const data = fs.readFileSync('D:/FinalProject-Henry/proyecto-final-henry/api/data/destinations.json', 'utf8');
    // console.log(JSON.parse(data))
    // res.status(200).json(JSON.parse(data))
  } catch (error) {
    res.status(400).send({ data: error.message });
  }
};

export const createDestination = async (req, res) => {
  console.log(req.body);
  const { name, image } = req.body;

  try {
    await Destination.create({
      name,
      image,
    });
    res.status(200).json({ message: "Destino creado satistactoriamente!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
