import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/index";


console.log(dbConfig)
const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "2002",
    database:"airbnb_hotel_dev",
    logging: true
});

export default sequelize;