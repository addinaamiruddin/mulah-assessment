import React, { useState, useEffect } from 'react';

function CSVTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data/Table_Input.csv');
      const csvData = await response.text();
      const rows = csvData.split('\n').map(row => row.split(','));
      setData(rows);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>CSV Table Viewer</h1>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              data[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CSVTable;
