const sql = require("./db.js");

// Constructor
const Product = function (product) {
    this.pro_name = product.pro_name;
    this.price = product.price;
    this.cat_id = product.cat_id;
};

// Get all products
Product.getAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Create product
Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (error, response) => {
        if (error) {
            result(error, null);
            return;
        }
        result(null, { id: response.insertId, ...newProduct });
    });
};

// Update product
Product.updateById = (id, updatedProduct, result) => {
    sql.query(
        "UPDATE products SET ? WHERE id = ?",
        [updatedProduct, id],
        (error, response) => {
            if (error) {
                result(error, null);
                return;
            }
            if (response.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...updatedProduct });
        }
    );
};

// Delete product
Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (error, response) => {
        if (error) {
            result(error, null);
            return;
        }
        if (response.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, response);
    });
};

module.exports = Product;
