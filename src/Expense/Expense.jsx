import Menu from "../components/menu/Menu";
import { Tag, DollarSign, Plus } from 'lucide-react';
import React, { useState } from 'react';
import './Expense.css'
import Modal from "../components/Modal/Modal";

const ExpensePage = () => {
    const [activeTab, setActiveTab] = useState('types');
    const [showModal, setShowModal] = useState(false);
    const menuItems = [
        { name: 'Expense Types', key: 'types', active: activeTab === 'types', click: () => setActiveTab('types'), icon: <Tag size={16} /> },
        { name: 'Expenses', key: 'expense', active: activeTab === 'expense', click: () => setActiveTab('expense'), icon: <DollarSign size={16} /> },
    ];
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
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} width="500px" height="300px">
                <form>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Name:</label>
                        <input type="text" style={{ width: '100%' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Amount:</label>
                        <input type="number" style={{ width: '100%' }} />
                    </div>
                    <button type="submit" className="primary-button">Save</button>
                </form>
            </Modal>
        </div>
    )
}

export default ExpensePage;
