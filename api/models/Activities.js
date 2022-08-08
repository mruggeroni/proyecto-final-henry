import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Classification } from "./Classification.js";


export const Activity = sequelize.define(
  "activity",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Classification.hasMany(Activity);
Activity.belongsTo(Classification);
