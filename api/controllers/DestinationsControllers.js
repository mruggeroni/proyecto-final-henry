import { Destination } from "../models/Destinations.js";

export const getDestination = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.status(200).send(destinations);
  } catch (error) {
    res.status(404).send({ data: error.message });
  }
};

export const createDestination = async (req, res) => {
  console.log(req.body);
  const { name, image, region } = req.body;

  try {
    const nuevoDestino = await Destination.findOrCreate({
      where: { name: name },
      defaults: { image: image, region: region },
    });
    if (nuevoDestino[1] === false) {
      return res
        .status(500)
        .json({ message: "This Destination alredy exists" });
    } else {
      res.status(200).json({ message: "Destination created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
