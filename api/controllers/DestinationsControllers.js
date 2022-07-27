import { Destination } from '../models/Destinations.js';

export const getDestination = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.status(200).send(destinations);
  } catch (error) {
    res.status(404).send({ data: error.message });
  };
};