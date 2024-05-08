import React, {  useState, useEffect } from 'react';
//import Chart from 'chart.js/auto';
import DataDisplay from './DataDisplay';
import './styles.css';
function App() {
    const [testDetails, setTestDetails] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setTestDetails(data.testDetails);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="app-container">
            <div className="frame"></div>
            <DataDisplay testDetails={testDetails} /> {/* Pass testDetails to DataDisplay component */}
           
        </div>
    );
  
}

export default App;