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

  const finalCategory = new Categories(body);
  return finalCategory
    .save()
    .then(() => res.json({ category: finalCategory.toJSON() }))
    .catch(next);
});

router.get("/", (req, res, next) => {
  return Categories.find()
    .sort({ createdAt: "descending" })
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

module.exports = router;
