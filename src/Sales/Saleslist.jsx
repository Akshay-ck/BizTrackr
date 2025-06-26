import React, { useState, useEffect } from 'react';
import ListView from '../Listview/Listview';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase";
import useFirestoreCollection from '../FirestoreCollection/useFirestoreCollection';

const SalesList = () => {
    const navigate = useNavigate();
    const handleCreate = () => {
        const matchedData = false
        navigate('/sales/create', { state: { matchedData } });
    };
    const handleRowClick = (id) => {
        const matchedData = salesData.find(item => item.id === id);
        if (matchedData) {
            navigate('/sales/create', { state: { matchedData } });
        }
    };
    const { data: salesData, loading, error } = useFirestoreCollection(db, 'sales');
    const headers = ['SL', 'Date', 'Customer', 'Bill', 'Payments'];
    const data = salesData.map((sale, index) => ({
        sl: index + 1,
        id: sale.id,
        customer: sale.customer,
        date: sale.create_date?.toDate().toISOString().split('T')[0] || '',
        bill: sale.bill,
        payments: sale.payment
    }));
    return(
        <ListView
          title="Recent Sales"
          headers={headers}
          data={data}
          onCreate={handleCreate}
          onRowClick={handleRowClick}
        />
    );
};

export default SalesList;
