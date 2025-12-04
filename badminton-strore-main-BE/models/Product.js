import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String, default: null },
  rating: { type: Number, default: 5 },
  image: { type: String, required: true },
  tag: { type: String, default: null }
});

// Thay module.exports bằng export default
const Product = mongoose.model('Product', productSchema);
export default Product;