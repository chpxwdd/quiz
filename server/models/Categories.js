const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategoriesSchema = new Schema(
  {
    title: String,
    description: String
  },
  { timestamps: true }
);

CategoriesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model("Categories", CategoriesSchema);
