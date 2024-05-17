import {Sequelize} from "sequelize";

const db = new Sequelize(
    'car_management',
    'postgres',
    '0000', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    });

export default db;