import React, { useEffect, useState } from "react";
import CategoryForm from "./components/CategoryForm";
import BudgetSummary from "./components/BudgetSummary";
import * as api from "./services/api";

const App = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = async () => {
    try {
      const data = await api.getBudgets();
      setBudgets(data);
    } catch (err) {
      console.error("Error fetching budgets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleAdd = async (newBudget) => {
    await api.addBudget(newBudget);
    fetchBudgets();
  };

  const handleDelete = async (id) => {
    await api.deleteBudget(id);
    fetchBudgets();
  };

  if (loading) return <p>Loading budget summary...</p>;

  return (
    <div>
      <h1>Personal Budget Tracker</h1>
      <CategoryForm onAdd={handleAdd} />
      <BudgetSummary budgets={budgets} onDelete={handleDelete} />
    </div>
  );
};

export default App;
