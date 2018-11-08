const mongoose = require("mongoose");
const router = require("express").Router();
const Categories = mongoose.model("Categories");

router.post("/", (req, res, next) => {
  const { body } = req;

  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: "is required"
      }
    });
  }

  if (!body.description) {
    return res.status(422).json({
      errors: {
        description: "is required"
      }
    });
  }

  const modelCategories = new Categories(body);
  return modelCategories
    .save()
    .then(() => res.json({ category: modelCategories.toJSON() }))
    .catch(next);
});

/**
 * GET ALL CATEGORIES
 */
router.get("/", (req, res, next) => {
  return Categories.find()
    .sort({ title: "ascending" })
    .then(categories =>
      res.json({ categories: categories.map(category => category.toJSON()) })
    )
    .catch(next);
});

router.param("id", (req, res, next, id) => {
  return Categories.findById(id, (err, category) => {
    if (err) {
      return res.sendStatus(404);
    } else if (category) {
      req.category = category;
      return next();
    }
  }).catch(next);
});

router.get("/:id", (req, res, next) => {
  return res.json({
    category: req.category.toJSON()
  });
});

router.patch("/:id", (req, res, next) => {
  const { body } = req;

  if (typeof body.title !== "undefined") {
    req.category.title = body.title;
  }

  if (typeof body.description !== "undefined") {
    req.category.description = body.description;
  }

  if (typeof body.parent !== "undefined") {
    req.category.parent = body.parent;
  }

  return req.category
    .save()
    .then(() => res.json({ category: req.category.toJSON() }))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  return Categories.findByIdAndRemove(req.category._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.get("/children/root", (req, res, next) => {
  return Categories.find({ parent: null })
    .sort({ title: "ascending" })
    .then(categories =>
      res.json({
        categoriesTreeView: categories.map((category, key) => {
          return category.toJSON();
        })
      })
    )
    .catch(next);
});

router.get("/children/:id", (req, res, next) => {
  return Categories.find({ parent: req.category.id })
    .sort({ title: "ascending" })
    .then(categories =>
      res.json({ categories: categories.map(category => category.toJSON()) })
    )
    .catch(next);
});

module.exports = router;
