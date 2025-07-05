import React from "react";
import { Tag } from "lucide-react";

const ExpenseTypeCard = ({ type, onEdit, onDelete }) => (
  <div className="expense-card">
    <div
      className="icon-circle"
      style={{ backgroundColor: `${type.color}20` }}
    >
      <Tag size={18} color={type.color} />
    </div>

    <div className="expense-info">
      <div className="expense-name">{type.name}</div>
      <div className="expense-date">
        {new Date(type.createdAt).toLocaleDateString()}
      </div>
    </div>

    <div className="expense-actions">
      <button className="icon-button" onClick={() => onEdit?.(type)}>
        <i className="fas fa-pen" />
      </button>
      <button className="icon-button" onClick={() => onDelete?.(type)}>
        <i className="fas fa-trash" />
      </button>
    </div>
  </div>
);

export default ExpenseTypeCard;
