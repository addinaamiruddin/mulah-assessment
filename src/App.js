import React, { useState, useEffect } from 'react';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [table2Data, setTable2Data] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/Table_Input.csv'); // Adjust the path to your CSV file
        const text = await response.text();
        const rows = text.split('\n').map(row => row.split(','));
        setCsvData(rows);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (csvData.length > 0) {
      const table2 = [
        ['Category', 'Value'],
        ['Alpha', getValue('A5') + getValue('A20')],
        ['Beta', getValue('A15') / getValue('A7')],
        ['Charlie', getValue('A13') * getValue('A12')],
      ];
      setTable2Data(table2);
    }
  }, [csvData]);

  const getValue = index => {
    const row = csvData.find(row => row[0] === index);
    return row ? parseFloat(row[1]) : 0;
  };

  return (
    <div>
      <h1>Table 1</h1>
      <table>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Table 2</h1>
      <table>
        <thead>
          <tr>
            {table2Data.length > 0 && table2Data[0].map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table2Data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
