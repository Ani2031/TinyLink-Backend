import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Link = sequelize.define(
  "Link",
  {
    code: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    targetUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    totalClicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastClickedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "links",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default Link;
