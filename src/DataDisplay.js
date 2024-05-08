import React, { useState } from 'react';
import './styles.css'; // Import the CSS file for styling
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
                <div className="selected-test-details">
                    <div className="test-details-box">
                        <p><strong>Test ID:</strong> {selectedTestDetail.TestId}</p>
                    </div>
                    <div className="test-details-box">
                        <p><strong>Run Date:</strong> {selectedTestDetail.RunDate}</p>
                    </div>
                    <div className="test-details-box">
                        <p><strong>Description:</strong> {selectedTestDetail.Description}</p>
                    </div>
                    <div className="test-details-box">
                        <p><strong>Test:</strong> {selectedTestDetail.Test}</p>
                    </div>
                    <div className="test-details-box">
                        <p><strong>Peak Number:</strong> {selectedTestDetail.PeakNumber}</p>
                    </div>
                    <div className="test-details-box">
                        <p><strong>Peak Duration:</strong> {selectedTestDetail.PeakDuration}</p>
                    </div>
                    <div className="test-details-box">
                        <p><strong>Valid Test Run:</strong> {selectedTestDetail.ValidTestRun}</p>
                    </div>
                    <div className="test-details-box">
                        <p><strong>Status:</strong> {selectedTestDetail.Status}</p>
                    </div>
                </div>
            )}
            {selectedTestDetail && <ChartComponent selectedTestDetail={selectedTestDetail} />}
        </div>
    );
}

export default DataDisplay;
