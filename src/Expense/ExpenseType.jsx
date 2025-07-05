import React, { useState } from 'react';

const colors = [
  '#2196F3', '#4CAF50', '#FFC107', '#F44336', '#9C27B0',
  '#FF9800', '#00C853', '#E91E63', '#607D8B', '#00BFA5',
  '#FF5252'
];

function AddExpenseTypeForm({ setShowModal, onSubmit }) {
  const [expenseName, setExpenseName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseName || !selectedColor) {
      alert('Please fill in both name and color');
      return;
    }

    const data = {
      name: expenseName,
      color: selectedColor,
    };

    console.log('Expense Type Created:', data);
    if (onSubmit) onSubmit(data);  // Pass data to parent if needed
    setShowModal(false);  // Close modal
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '15px' }}>Add Expense Type</h2>

      {/* Name Field */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Name</label>
        <input
          type="text"
          placeholder="Enter expense type name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        />
      </div>

      {/* Color Picker */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Color</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => setSelectedColor(color)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: color,
                border: selectedColor === color ? '3px solid #000' : '2px solid white',
                cursor: 'pointer',
                boxShadow: '0 0 2px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button
          type="button"
          onClick={() => setShowModal(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#1a73e8',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Add Type
        </button>
      </div>
    </form>
  );
}

export default AddExpenseTypeForm;
