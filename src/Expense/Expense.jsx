import Menu from "../components/menu/Menu";
import { Tag, DollarSign, Plus } from 'lucide-react';
import React, { useState } from 'react';
import './Expense.css'
import Modal from "../components/Modal/Modal";
import ExpenseForm from "./ExpensMark";

const ExpensePage = () => {
    const [activeTab, setActiveTab] = useState('types');
    const [showModal, setShowModal] = useState(false);
    const menuItems = [
        { name: 'Expense Types', key: 'types', active: activeTab === 'types', click: () => setActiveTab('types'), icon: <Tag size={16} /> },
        { name: 'Expenses', key: 'expense', active: activeTab === 'expense', click: () => setActiveTab('expense'), icon: <DollarSign size={16} /> },
    ];
    const [expenseName, setExpenseName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const colors = [
    '#1e90ff', '#3cb371', '#f4a300', '#dc3545',
    '#9b59b6', '#ff8c00', '#2ecc71', '#e91e63',
    '#6c757d', '#00bfa5', '#ff4757'
    ];

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", expenseName);
    console.log("Selected Color:", selectedColor);
    // Submit logic here
    };

    return(
        <div className="page-container">
            <Menu menuItems={menuItems}/>
            <div className="exp_card">
                <div className="exp_card-header">
                    <h2>{activeTab === 'types' ? 'Expense Types' : 'Expenses'}</h2>
                    <button className="add-button" 
                    onClick={() => setShowModal(true)}>
                        <Plus size={14} /> {activeTab === 'types' ? 'Add Type' : 'Add Expense'}
                    </button>
                </div>

                <div className="empty-state">
                    {activeTab === 'types' ? <Tag size={40} /> : <DollarSign size={40} />}
                    <h3>No {activeTab === 'types' ? 'expense types' : 'expenses'} yet</h3>
                    <p>
                        Create your first {activeTab === 'types' ? 'expense type' : 'expense'} to get started.
                    </p>
                    <button className="primary-button">
                        {activeTab === 'types' ? 'Add Expense Type' : 'Add Expense'}
                    </button>
                </div>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} width="500px" height="auto">
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
</Modal>

        </div>
    )
}

export default ExpensePage;
