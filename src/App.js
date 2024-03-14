import React, { useState, useEffect } from 'react';

function App() {
  const [table1Data, setTable1Data] = useState([]);

  useEffect(() => {
    // Fetch Table 1 data
    async function fetchData() {
      try {
        const response = await fetch('/Table_Input.csv');
        const csvData = await response.text();
        const parsedData = csvData.split('\n').map(row => row.split(','));
        setTable1Data(parsedData);
      } catch (error) {
        console.error('Error fetching Table 1 data:', error);
      }
    }
    fetchData();
  }, []);

  // Calculate results for Table 2
  const calculateResult = (expression) => {
    let result = null;
    try {
      const evaluated = eval(expression.replace(/([A-Z]\d+)/g, (match, index) => {
        const value = table1Data.find(row => row[0] === index);
        return value ? parseFloat(value[1]) : match;
      }));
      result = isNaN(evaluated) ? null : evaluated;
    } catch (error) {
      console.error('Error evaluating expression:', error);
    }
    return result;
  };

  // Table 2 data
  const table2Data = [
    { category: 'Alpha', expression: 'A5 + A20' },
    { category: 'Beta', expression: 'A15 / A7' },
    { category: 'Charlie', expression: 'A13 * A12' }
  ].map(row => ({
    category: row.category,
    value: calculateResult(row.expression)
  }));

  return (
    <div>
      <h1>Table 1</h1>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {table1Data.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h1>Table 2</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {table2Data.map((row, index) => (
            <tr key={index}>
              <td>{row.category}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
