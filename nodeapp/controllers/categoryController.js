const Category = require('../models/Category');

// Add a new budget entry
exports.addCategory = async (req, res) => {
  try {
    const { amount, categoryName, type, date, description } = req.body;

    if (!amount || !categoryName || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEntry = new Category({ amount, categoryName, type, date, description });
    await newEntry.save();

    res.json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all budget entries
exports.getAllCategories = async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    const filter = category ? { categoryName: category } : {};
    const sort = sortBy ? { [sortBy]: 1 } : {};
    const entries = await Category.find(filter).sort(sort);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get entries by category
exports.getByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const entries = await Category.find({ categoryName });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an entry
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Entry not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an entry
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Budget summary (optional)
exports.getBudgetSummary = async (req, res) => {
  try {
    const entries = await Category.find();
    const summary = entries.map(entry => ({
      categoryName: entry.categoryName,
      allocatedAmount: entry.amount,
      spentAmount: entry.type === 'expense' ? entry.amount : 0,
      remainingAmount: entry.type === 'income' ? entry.amount : 0,
    }));
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
