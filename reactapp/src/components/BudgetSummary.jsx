import React, { useEffect, useState } from "react";
import { getBudgetSummary } from "../services/api";

const BudgetSummary = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getBudgetSummary();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading budget summary...</p>;

  if (summary.length === 0) return <p>No categories found.</p>;

  return (
    <div>
      <h2>Budget Summary</h2>
      <ul>
        {summary.map((item, index) => (
          <li key={index}>
            <strong>{item.categoryName}</strong> — Allocated: {item.allocatedAmount} | Spent:{" "}
            {item.spentAmount} <br />
            {item.description && <em>{item.description}</em>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSummary;
