import mysql from "mysql";
import dbConfig from "../config/db_config.js";

const pool = mysql.createPool(dbConfig);

const UserController = {

    getUsers(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query("SELECT * FROM users", (err, rows) => {
                connection.release();
                if (!err) {
                    res.status(200);
                    res.send(rows);
                } else {
                    res.status(404);
                    console.log(err);
                }
            });
        });
    },

    insertUsers(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            const {id, firstName, lastName, age, nationality} = req.body;
            connection.query(
                `INSERT INTO users VALUES (${id}, ${firstName}, ${lastName}, ${age}, ${nationality})`,
                (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.status(201);
                        res.send(rows);
                    } else {
                        res.status(400);
                        console.log(err);
                    }
                }
            );
        });
    },

}

export default UserController;