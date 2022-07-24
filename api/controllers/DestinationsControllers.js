// import { Destination } from '../models/Destination.js';
import * as fs from 'fs';

export const getDestination = async (req, res) => {
  try {
    // const destinations = await Destination.findAll();
    // res.status(200).send(destinations)
    const data = fs.readFileSync('D:/FinalProject-Henry/proyecto-final-henry/api/data/destinations.json', 'utf8');
    console.log(JSON.parse(data))
    res.status(200).json(JSON.parse(data))

  } catch (error) {
    res.status(400).send({ data: error.message })
  }
} 