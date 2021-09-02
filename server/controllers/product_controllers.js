import mysql from "mysql";
import dbConfig from "../config/db_config.js";
import fs from "fs";
import * as path from "path";

// Global Directory Declaration
const __dirname = path.resolve();
// Long SQL Query Files As Raw Strings
const updateSql = fs
  .readFileSync(path.join(__dirname, "/sql", "update_product.sql").toString())
  .toString();
// MySQL Connection Pool
const pool = mysql.createPool(dbConfig);

const ProductController = {
  getOne(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const id = req.params.id;
      connection.query(
        `SELECT * FROM products WHERE id=?`,
        [id],
        (err, rows) => {
          connection.release();
          if (!err && rows[0]) {
            console.log(
              "SERVER SUCCESSFULLY FETCHED SPECIFIC PRODUCT FROM DATABASE."
            );
            res.status(200).send(rows[0]);
          } else {
            res.status(404);
            console.log(
              "SERVER COULD NOT FIND A PRODUCT FROM THE DATABASE MATCHING THAT DESCRIPTION."
            );
          }
        }
      );
    });
  },

  getAll(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(`SELECT * FROM products`, (err, rows) => {
        connection.release();
        if (!err) {
          console.log(
            "SERVER SUCCESSFULLY FETCHED ALL PRODUCTS FROM DATABASE."
          );
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
      connection.query(`INSERT INTO products SET ?`, data, (err, rows) => {
        connection.release();
        if (!err) {
          console.log("SERVER INSERTED PRODUCT INTO DATABASE.");
          res.status(201).send(rows);
        } else {
          res.status(400);
          console.log(err);
        }
      });
    });
  },

  update(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const { id, name, price, type, image } = req.body;
      connection.query(
        updateSql,
        [name, price, type, image, id],
        (err, rows) => {
          connection.release();
          if (!err) {
            console.log("SERVER SUCCESSFULLY UPDATED PRODUCT IN DATABASE.");
            res.status(200).send(rows);
          } else {
            res.status(400);
            console.log(err);
          }
        }
      );
    });
  },

  delete(req, res) {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const { id } = req.body;
      connection.query(`DELETE FROM products WHERE id=?`, [id], (err, rows) => {
        connection.release();
        if (!err) {
          console.log("SERVER SUCCESSFULLY DELETED BILL FROM DATABASE.");
          res.status(200).send(rows);
        } else {
          res.status(406);
          console.log(err);
        }
      });
    });
  },
};

export default ProductController;
