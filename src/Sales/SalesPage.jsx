import React, { useState } from 'react';
import './SalesPage.css';
import { useLocation } from 'react-router-dom';

const SalesPage = () => {
  const location = useLocation();
  const { matchedData } = location.state || {};
  console.log('matchedData', matchedData)
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: '',
    product: '',
    quantity: '',
    rate: '',
    payment: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    const quantity = parseFloat(form.quantity) || 0;
    const rate = parseFloat(form.rate) || 0;
    const payment = parseFloat(form.payment) || 0;
    const billAmount = quantity * rate;

    // Cumulative balance calculation
    const prevBalance = entries.length > 0 ? entries[entries.length - 1].balance : 0;
    const currentBalance = prevBalance + billAmount - payment;

    const newEntry = {
      ...form,
      quantity,
      rate,
      billAmount,
      payment,
      balance: currentBalance,
    };

    setEntries([...entries, newEntry]);

    // Reset form
    setForm({
      date: '',
      product: '',
      quantity: '',
      rate: '',
      payment: '',
    });
  };

  return (
    <div className="sales-page">
      <h2>Sales Entry</h2>

      <form className="sales-form" onSubmit={handleAddEntry}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="text" name="product" placeholder="Product Name" value={form.product} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input type="number" name="rate" placeholder="Rate" value={form.rate} onChange={handleChange} required />
        <input type="number" name="payment" placeholder="Payment" value={form.payment} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>

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
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.product}</td>
              <td>{entry.quantity}</td>
              <td>{entry.rate}</td>
              <td>{entry.billAmount}</td>
              <td>{entry.payment}</td>
              <td>{entry.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesPage;
