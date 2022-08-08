import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


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
