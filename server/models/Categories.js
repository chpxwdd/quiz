const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategoriesSchema = new Schema(
  {
    title: String,
    description: String,
    parent: String
  },
  { timestamps: true }
);

CategoriesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    parent: this.parent,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

/** */
CategoriesSchema.statics.findChildren = function(id, cb) {
  return this.find({ parent: id }, cb);
};

mongoose.model("Categories", CategoriesSchema);
