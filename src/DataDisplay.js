import React, { useState } from 'react';
import ChartComponent from './ChartComponent';

function DataDisplay({ testDetails }) {
    const [selectedTestId, setSelectedTestId] = useState('');
    const [selectedTestDetail, setSelectedTestDetail] = useState(null);

    // Function to handle TestId selection change
    const handleTestIdChange = (event) => {
        const id = parseInt(event.target.value);
        setSelectedTestId(id);
        const selectedDetail = testDetails.find(detail => detail.TestId === id);
        setSelectedTestDetail(selectedDetail);
    };

    // Remove the selected test ID from the list of options
    const filteredTestDetails = testDetails.filter(detail => detail.TestId !== parseInt(selectedTestId));

    return (
        <div>
            <h1>Test Details</h1>
            <select value={selectedTestId} onChange={handleTestIdChange}>
                <option value="">Select TestId</option>
                {filteredTestDetails.map(detail => (
                    <option key={detail.TestId} value={detail.TestId}>{detail.TestId}</option>
                ))}
            </select>
            <br />
            {selectedTestDetail && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(selectedTestDetail).map(key => (
                                    <th key={key} style={{ fontWeight: 'bold', backgroundColor: 'lightgrey', padding: '10px' }}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.keys(selectedTestDetail).map(key => (
                                    <td key={key} style={{ padding: '10px' }}>{selectedTestDetail[key]}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {selectedTestDetail && <ChartComponent selectedTestDetail={selectedTestDetail} />}
        </div>
    );
}

export default DataDisplay;