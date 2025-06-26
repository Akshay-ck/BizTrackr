import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SalesPage1.css';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase";

function SalesPage1() {
  const location = useLocation();
  const { matchedData } = location.state || {};

  const [customerName, setCustomerName] = useState(matchedData?.customer || '');
  const [totalBill, setTotalBill] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);


  const [salesRows, setSalesRows] = useState([]);
  const [isEditMode, setIsEditMode] = useState(!matchedData); // if no data, allow editing (new create)

  useEffect(() => {
    console.log('matchedData', matchedData)
    if (matchedData && matchedData.rows) {
      setSalesRows(JSON.parse(matchedData.rows)); // assuming matchedData has `rows` array
    }
  }, [matchedData]);

  const handleAddLine = () => {
    setSalesRows([
      ...salesRows,
      {
        date: '',
        product: '',
        qty: '',
        rate: '',
        bill: '',
        payment: '',
        balance: ''
      }
    ]);
  };

  const recalculateBalances = (rows) => {
    let runningBalance = 0;
    let totalBillCalc = 0;
    let totalPaymentCalc = 0;

    const updatedRows = rows.map((row) => {
      const qty = parseFloat(row.qty) || 0;
      const rate = parseFloat(row.rate) || 0;
      const payment = parseFloat(row.payment) || 0;

      const bill = qty * rate;
      const balance = runningBalance + bill - payment;

      runningBalance = balance;
      totalBillCalc += bill;
      totalPaymentCalc += payment;

      return {
        ...row,
        bill: bill.toFixed(2),
        balance: balance.toFixed(2)
      };
    });

    setTotalBill(totalBillCalc.toFixed(2));
    setTotalPayment(totalPaymentCalc.toFixed(2));
    return updatedRows;
  };



  const handleInputChange = (index, field, value) => {
    const updatedRows = [...salesRows];
  
    updatedRows[index][field] = value;
    const recalculated = recalculateBalances(updatedRows);
    setSalesRows(recalculated);
    // setSalesRows(updatedRows);
  };

  const handleDeleteRow = (indexToDelete) => {
    const updatedRows = salesRows.filter((_, index) => index !== indexToDelete);
    setSalesRows(updatedRows);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = async() => {
    try {
      const salesData = {
        customer: matchedData?.customerName || customerName, // optional
        rows: JSON.stringify(salesRows),
        bill: totalBill,
        payment: totalPayment
      };

      if (matchedData?.id) {
        // Update existing document
        const docRef = doc(db, 'sales', matchedData.id);
        await setDoc(docRef, salesData, { merge: true }); // merge: true keeps existing fields
      } else {
        // Add new document
        await addDoc(collection(db, 'sales'), salesData);
      }

      alert('Data saved to Firebase!');
      setIsEditMode(false);
    } catch (error) {
      console.error('Firebase Save Error:', error);
      alert('Failed to save data.');
    }
    // TODO: Save to backend or send to another component
    setIsEditMode(false);
  };

  return (
    <div className="sales-page">
      <div className="header-controls">
        {!isEditMode && <button onClick={handleEdit}>Edit</button>}
        {isEditMode && <button onClick={handleSave}>Save</button>}
        {!matchedData && <button onClick={handleSave}>Create</button>}
      </div>

      <h2>Sales Entry</h2>
      <div className="input-group">
        <input type="text" placeholder="Customer Name" onChange={(e) => setCustomerName(e.target.value)} readOnly={!isEditMode}/>
        <input type="text" placeholder="Total Bill Amount" readOnly  value={totalBill}/>
        <input type="text" placeholder="Total Payments" readOnly value={totalPayment}/>
      </div>

      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Bill</th>
            <th>Payment</th>
            <th>Balance</th>
            {isEditMode && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {salesRows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) =>
                    handleInputChange(index, 'date', e.target.value)
                  }
                  readOnly={!isEditMode}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.product}
                  onChange={(e) =>
                    handleInputChange(index, 'product', e.target.value)
                  }
                  readOnly={!isEditMode}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) =>
                    handleInputChange(index, 'qty', e.target.value)
                  }
                  readOnly={!isEditMode}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) =>
                    handleInputChange(index, 'rate', e.target.value)
                  }
                  readOnly={!isEditMode}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.bill}
                  onChange={(e) =>
                    handleInputChange(index, 'bill', e.target.value)
                  }
                  readOnly={!isEditMode}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.payment}
                  onChange={(e) =>
                    handleInputChange(index, 'payment', e.target.value)
                  }
                  readOnly={!isEditMode}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.balance}
                  onChange={(e) =>
                    handleInputChange(index, 'balance', e.target.value)
                  }
                  readOnly={!isEditMode}
                />
              </td>
              {isEditMode && (
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
          {isEditMode && (
            <tr>
              <td colSpan={8}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleAddLine(); }}>
                  + Add a line
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPage1;
