const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  categoryName: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, default: '' }
});

module.exports = mongoose.model('Category', categorySchema);
