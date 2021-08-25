import mysql from "mysql";
import dbConfig from "../config/db_config.js";

const pool = mysql.createPool(dbConfig);

const BillController = {

    get(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(`SELECT * FROM bills`, (err, rows) => {
                connection.release();
                if (!err) {
                    console.log('SERVER SUCCESSFULLY FETCHED ALL BILLS FROM DATABASE.');
                    res.status(200).send(rows);
                } else {
                    res.status(404);
                    console.log(err);
                }
            });
        });
    },

    insert(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            const data = req.body;
            connection.query(
                `INSERT INTO bills SET ?`, data,
                (err, rows) => {
                    connection.release();
                    if (!err) {
                        console.log('SERVER INSERTED BILL INTO DATABASE.');
                        res.status(201).send(rows);
                    } else {
                        res.status(400);
                        console.log(err);
                    };
                },
            );
        }, );
    },

    update(req, res) {
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
                `UPDATE bills SET rent=COALESCE(?, rent), water=COALESCE(?, water), gas=COALESCE(?, gas), electricity=COALESCE(?, electricity), broadband=COALESCE(?, broadband), council_tax=COALESCE(?, council_tax) WHERE id=?`,
                [rent, water, gas, electricity, broadband, council_tax, id],
                (err, rows) => {
                    connection.release();
                    if (!err) {
                        console.log('SERVER SUCCESSFULLY UPDATED BILL IN DATABASE.');
                        res.status(200).send(rows);
                    } else {
                        res.status(400);
                        console.log(err);
                    };
                },
            );
        }, );
    },

    delete(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            const {
                id
            } = req.body;
            connection.query(
                `DELETE FROM bills WHERE id=?`,
                [id],
                (err, rows) => {
                    connection.release();
                    if (!err) {
                        console.log('SERVER SUCCESSFULLY DELETED BILL FROM DATABASE.');
                        res.status(200).send(rows);
                    } else {
                        res.status(406);
                        console.log(err);
                    };
                },
            );
        }, );
    },

}

export default BillController;