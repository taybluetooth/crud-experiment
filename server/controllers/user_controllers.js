import mysql from "mysql";
import dbConfig from "../config/db_config.js";

const pool = mysql.createPool(dbConfig);

const UserController = {

    getUsers(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log(`CONNECTED AS ID: ${connection.threadId}`);
            connection.query("SELECT * FROM users", (err, rows) => {
                connection.release();
                if (!err) {
                    res.send(rows);
                } else {
                    console.log(err);
                }
            });
        });
    },

    insertUsers(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log(`CONNECTED AS ID: ${connection.threadId}`);
            connection.query(
                "INSERT INTO users VALUES (1, 'Callum', 'Taylor', 20, 'Scottish')",
                (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.send(rows);
                    } else {
                        console.log(err);
                    }
                }
            );
        });
    },

}

export default UserController;