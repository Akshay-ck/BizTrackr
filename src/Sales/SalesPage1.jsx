import React, { useState } from 'react';
import './SalesPage1.css';

function SalesPage1() {
  const [salesRows, setSalesRows] = useState([]);

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

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...salesRows];
    updatedRows[index][field] = value;
    setSalesRows(updatedRows);
  };

  const handleDeleteRow = (indexToDelete) => {
    const updatedRows = salesRows.filter((_, index) => index !== indexToDelete);
    setSalesRows(updatedRows);
  };

  return (
    <div className="sales-page">
      <div className="header-controls">
        <button>Edit</button>
        <button>Create</button>
      </div>

      <h2>Sales Entry</h2>
      <div className="input-group">
        <input type="text" placeholder="Customer Name" />
        <input type="text" placeholder="Total Bill Amount" readOnly />
        <input type="text" placeholder="Total Payments" readOnly />
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
            <th>Action</th>
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
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.product}
                  onChange={(e) =>
                    handleInputChange(index, 'product', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) =>
                    handleInputChange(index, 'qty', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) =>
                    handleInputChange(index, 'rate', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.bill}
                  onChange={(e) =>
                    handleInputChange(index, 'bill', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.payment}
                  onChange={(e) =>
                    handleInputChange(index, 'payment', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.balance}
                  onChange={(e) =>
                    handleInputChange(index, 'balance', e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteRow(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={8}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleAddLine(); }}>
                + Add a line
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SalesPage1;
