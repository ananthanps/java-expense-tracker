const express = require('express');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json());
app.use('/api/categories', categoryRoutes);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Force the server to use port 8080
const PORT = 8080;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/project_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => console.error('❌ MongoDB connection error:', err));
db.once('open', () => console.log('✅ MongoDB connected successfully'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
