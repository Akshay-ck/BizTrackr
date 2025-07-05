import Menu from "../components/menu/Menu";
import { Tag, DollarSign, Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase";
import './Expense.css'
import Modal from "../components/Modal/Modal";
import ExpenseForm from "./ExpensMark";
import AddExpenseTypeForm from "./ExpenseType";
import useFirestoreCollection from '../FirestoreCollection/useFirestoreCollection';
import Kanban from "../components/Kanban/KanbanGrid";


const ExpensePage = () => {
    const [activeTab, setActiveTab] = useState('types');
    const [showModal, setShowModal] = useState(false);
    const [ExpenseType, setexpenseType] = useState([]);
    const [Expense, setExpense] = useState([]);

    const { data: expenseTypesData, loading, error, refresh } = useFirestoreCollection(db, 'expenseTypes');
    const types = expenseTypesData.map(doc => ({
        id: doc.id,
        ...doc
      }));
    console.log('types', types)
    useEffect(() => {
      console.log("Updated ExpenseType:", ExpenseType);
      if (showModal) {
    document.body.style.overflow = 'hidden';  // Disable scroll
  } else {
    document.body.style.overflow = 'auto';    // Re-enable scroll
  }

  // Cleanup on unmount
  return () => {
    document.body.style.overflow = 'auto';
  };
    }, [ExpenseType, showModal]);
    const menuItems = [
        { name: 'Expense Types', key: 'types', active: activeTab === 'types', click: () => setActiveTab('types'), icon: <Tag size={16} /> },
        { name: 'Expenses', key: 'expense', active: activeTab === 'expense', click: () => setActiveTab('expense'), icon: <DollarSign size={16} /> },
    ];

    const saveExpenseType = async (data) => {
      try {
        const enrichedData = {
          ...data,
          createdAt: new Date().toISOString()
        };
        const docRef = await addDoc(collection(db, "expenseTypes"), enrichedData);
        console.log("Expense type saved with ID:", docRef.id);
        return enrichedData;  // return the data with timestamp for UI update
      } catch (error) {
        console.error("Error saving expense type:", error);
        throw error;
      }
    };

    const handleSubmit = async (data) => {
      console.log("data:", data);
      try {
        if (activeTab === 'types'){
          let savedData = await saveExpenseType(data);  // Save to Firestore
          await refresh();
          setexpenseType(prev => [...prev, savedData]);
        }
        else {
          setExpense(data)
        }
      }
      catch (error){
        alert("Failed to save data. Please try again.");
        console.error("Submit Error:", error);
      }
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

                {activeTab === 'types' ? (
                  types.length > 0 ? (
                    <Kanban
                      items={types}
                      onEdit={(item) => console.log("Edit clicked", item)}
                      onDelete={(id) => console.log("Delete clicked", id)}
                    />
                  ) : (
                    <div className="empty-state">
                      {loading && <p>Loading expense types...</p>}
                      <Tag size={40} />
                      <h3>No expense types yet</h3>
                      <p>Create your first expense type to get started.</p>
                      <button className="primary-button" onClick={() => setShowModal(true)}>Add Expense Type</button>
                    </div>
                  )
                ) : (
                  <div className="empty-state">
                    <DollarSign size={40} />
                    <h3>No expenses yet</h3>
                    <p>Create your first expense to get started.</p>
                    <button className="primary-button" onClick={() => setShowModal(true)}>Add Expense</button>
                  </div>
                )
              }
            </div>
            {activeTab === 'types'? 
              (<Modal isOpen={showModal} onClose={() => setShowModal(false)} width="500px">
                <AddExpenseTypeForm setShowModal={setShowModal} onSubmit={handleSubmit}/>
              </Modal>):
              (<Modal isOpen={showModal} onClose={() => setShowModal(false)} width="800px">
                <ExpenseForm />
              </Modal>)
            }
        </div>
    )
}

export default ExpensePage;
