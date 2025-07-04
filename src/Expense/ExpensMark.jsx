import React, { useState } from 'react';

function ExpenseForm() {
  const [expenseType, setExpenseType] = useState('');
  const [description, setDescription] = useState('');
  const [lines, setLines] = useState([
    { name: '', amount: '' }
  ]);

  const handleLineChange = (index, field, value) => {
    const updated = [...lines];
    updated[index][field] = value;
    setLines(updated);
  };

  const addLine = () => {
    setLines([...lines, { name: '', amount: '' }]);
  };

  const removeLine = (index) => {
    const updated = [...lines];
    updated.splice(index, 1);
    setLines(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expense Type:', expenseType);
    console.log('Description:', description);
    console.log('Lines:', lines);
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Record Expense</h2>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>Expense Type</strong></label>
        <select
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">Select type</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="utilities">Utilities</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>Description</strong></label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <div>
        <label><strong>Expense Lines</strong></label>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={thStyle}>Sl No</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>
                  <input
                    type="text"
                    value={line.name}
                    onChange={(e) => handleLineChange(index, 'name', e.target.value)}
                    style={inputStyle}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    type="number"
                    value={line.amount}
                    onChange={(e) => handleLineChange(index, 'amount', e.target.value)}
                    style={inputStyle}
                  />
                </td>
                <td style={tdStyle}>
                  <button type="button" onClick={() => removeLine(index)} style={deleteButtonStyle}>×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addLine} style={{ marginTop: '10px', padding: '6px 12px' }}>+ Add Line</button>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" style={submitButtonStyle}>Submit Expense</button>
      </div>
    </form>
  );
}

// Style helpers
const thStyle = { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ccc' };
const tdStyle = { padding: '8px', verticalAlign: 'middle' };
const inputStyle = { width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' };
const deleteButtonStyle = { padding: '4px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const submitButtonStyle = { padding: '10px 20px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', borderRadius: '6px' };

export default ExpenseForm;
