import React, {  useState, useEffect } from 'react';
//import Chart from 'chart.js/auto';
import DataDisplay from './DataDisplay';
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
        <div>
            <DataDisplay testDetails={testDetails} /> {/* Pass testDetails to DataDisplay component */}
           
        </div>
    );
  
}

export default App;