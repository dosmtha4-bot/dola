module.exports = app => {
  const category = require("../controllers/category.controller.js");
  const router = require("express").Router();

  // GET all categories
  router.get("/", category.findAll);

  // CREATE new category 
  router.post("/", category.create);

  // UPDATE category
  router.put("/:id", category.update);

  // DELETE category
  router.delete("/:id", category.delete);

  // use /categories
  app.use("/categories", router);
};
