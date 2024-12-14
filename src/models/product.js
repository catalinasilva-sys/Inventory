const { Schema, model } = require('mongoose');
const productSchema = new Schema(
   {
      item: { type: String, required: true },
      description: { type: String, required: true },
      inStock: { type: Number, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);
module.exports = model('product', productSchema);
