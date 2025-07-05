// components/Kanban/Kanban.js
import React from 'react';
import './Kanban.css';
import { Tag } from 'lucide-react';

const Kanban = ({ items, onEdit, onDelete }) => {
  return (
    <div className="kanban-grid">
      {items.length === 0 ? (
        <div className="kanban-empty">No items found.</div>
      ) : (
        items.map((item) => (
          <div className="expense-card" key={item.id}>
            <div className="icon-circle" style={{ backgroundColor: item.color || '#e1e1e1' }}>
              <Tag size={18} color="#555" />
            </div>
            <div className="expense-info">
              <div className="expense-name">{item.name}</div>
              <div className="expense-date">{new Date(item.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="expense-actions">
              <button className="icon-button" onClick={() => onEdit(item)}>
                ✏️
              </button>
              <button className="icon-button" onClick={() => onDelete(item.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Kanban;
