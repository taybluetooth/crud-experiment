import mysql from "mysql";
import dbConfig from "../config/db_config.js";

const pool = mysql.createPool(dbConfig);

const BillController = {

    getBills(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query("SELECT * FROM bills", (err, rows) => {
                connection.release();
                if (!err) {
                    res.status(200).send(rows);
                } else {
                    res.status(404);
                    console.log(err);
                }
            });
        });
    },

    insertBills(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            const {
                id,
                rent,
                water,
                gas,
                electricity,
                broadband,
                council_tax
            } = req.body;
            connection.query(
                `INSERT INTO bills VALUES (${id}, ${rent}, ${water}, ${gas}, ${electricity}, ${broadband}, ${council_tax})`,
                (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.status(201);
                        res.send(rows);
                    } else {
                        res.status(400);
                        console.log(err);
                    };
                },
            );
        }, );
    },

}

export default BillController;