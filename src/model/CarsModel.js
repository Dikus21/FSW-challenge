import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const cars = db.define('cars', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
}, {
    freezeTableName: true,
});

export default cars;

(async () => {
    await db.sync();
})();