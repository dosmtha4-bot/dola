const sql = require("./db.js");

// Constructor
const Category = function (category) {
  this.cat_name = category.cat_name;   // ← ຕ້ອງໃຊ້ cat_name
  this.is_deleted = category.is_deleted || 0;
};

// Get all
Category.getAll = result => {
  sql.query("SELECT * FROM categories WHERE is_deleted = 0", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Create
Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newCategory });
  });
};

// Update
Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE categories SET cat_name = ? WHERE id = ?",
    [category.cat_name, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...category });
    }
  );
};

// Delete (soft delete optional)
Category.remove = (id, result) => {
  sql.query("UPDATE categories SET is_deleted = 1 WHERE id = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Category;
