// En esta tabla se definen las categorías de los paquetes vacacionales.
// Estos pueden ser: Crucero, Tour, Estancia?
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
//import { Activity } from '../models/Activities.js';

export const Classification = sequelize.define(
  "classification",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
//console.log('POTATO')
//console.log(sequelize.models)
