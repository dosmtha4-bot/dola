const Category = require("../models/category.model");

exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error fetching categories"
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  if (!req.body || !req.body.cat_name) {
    res.status(400).send({
      message: "Category name cannot be empty!"
    });
    return;
  }

  const newCategory = new Category({
    cat_name: req.body.cat_name,
    is_deleted: false
  });

  Category.create(newCategory, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the category."
      });
    } else {
      res.status(201).send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data to update cannot be empty!" });
    return;
  }

  Category.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Category with id ${req.params.id} not found.` });
      } else {
        res.status(500).send({ message: `Error updating category with id ${req.params.id}` });
      }
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  Category.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Category with id ${req.params.id} not found.` });
      } else {
        res.status(500).send({ message: `Could not delete category with id ${req.params.id}` });
      }
    } else {
      res.send({ message: "Category was deleted successfully!" });
    }
  });
};

exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      });
    } else res.send(data);
  });
};
