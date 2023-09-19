import mysql from "mysql2";
import config from "../config";

const sql = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
}).promise();

export default sql;
