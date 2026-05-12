import React, { useState } from "react";

const CategoryForm = ({ onAdd }) => {
  const [categoryName, setCategoryName] = useState("");
  const [allocatedAmount, setAllocatedAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    const amount = parseFloat(allocatedAmount);
    if (isNaN(amount) || amount < 0) {
      setError("Allocated amount must be a non-negative number");
      return;
    }

    // Clear error if valid
    setError("");

    // Call parent callback
    onAdd({
      categoryName,
      allocatedAmount: amount,
      description,
    });

    // Reset form
    setCategoryName("");
    setAllocatedAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Category</h2>

      <div>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          id="categoryName"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="allocatedAmount">Allocated Amount:</label>
        <input
          id="allocatedAmount"
          type="number"
          value={allocatedAmount}
          onChange={(e) => setAllocatedAmount(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryForm;
