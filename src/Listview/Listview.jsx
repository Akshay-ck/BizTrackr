import React from 'react';
import './ListView.css'; 

const ListView = ({ title, headers, data, onCreate, onRowClick }) => {
  return (
    <div className="list-view">
      <div className="list-view-header">
        <h2>{title}</h2>
        <button className="create-btn" onClick={onCreate}>+ Create</button>
      </div>

      <table className="list-table">
        <thead>
          <tr>
            {headers.map((header, i) => <th key={i}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i} onClick={() => onRowClick?.(row.id)} className="clickable-row">
                {headers.map((key, j) => (
                  <td key={j}>{row[key.toLowerCase()]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} style={{ textAlign: 'center' }}>No data found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
