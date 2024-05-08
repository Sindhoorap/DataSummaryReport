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
           <h1 className="test-details-title">Performance Test Results - NBCU US</h1>
           <hr className="title-line" />
            <select value={selectedTestId} onChange={handleTestIdChange} className="my-dropdown">
                <option value="">Select TestId</option>
                {filteredTestDetails.map(detail => (
                    <option key={detail.TestId} value={detail.TestId}>{detail.TestId}</option>
                ))}
            </select>
            <br />
            {selectedTestDetail && (
                <div className="selected-test-details">
                    <div className="test-details-box">
                        <p className="test-id">
                            <strong>Test ID</strong> 
                        </p>
                        <p className="selected-test-id">
                            {selectedTestDetail.TestId}
                        </p>
                    </div>
                    <div className="test-details-box">
                        <p className="test-id">
                            <strong>Run Date</strong>
                        </p>
                        <p className="selected-test-id"> {selectedTestDetail.RunDate}</p>
                    </div>
                    
                    <div className="test-details-box">
                        <p className="test-id">
                            <strong>Test</strong> 
                        </p>
                        <p className="selected-test-id">{selectedTestDetail.Test}</p>
                    </div>
                    <div className="test-details-box">
                        <p className="test-id">
                            <strong>Peak Number</strong>
                        </p>
                        <p className="selected-test-id"> {selectedTestDetail.PeakNumber}</p>
                    </div>
                    <div className="test-details-box">
                        <p className="test-id">
                            <strong>Peak Duration</strong> 
                        </p>
                        <p className="selected-test-id">{selectedTestDetail.PeakDuration}</p>
                    </div>
                    <div className="test-details-box">
                        <p className="test-id">
                            <strong>Valid Test Run</strong> 
                        </p>
                        <p className="selected-test-id">{selectedTestDetail.ValidTestRun}</p>
                    </div>
                    <div className="test-details-box">
                        <p className="test-id">
                            <strong>Status</strong> 
                        </p>
                        <p className="selected-test-id">{selectedTestDetail.Status}</p>
                    </div>
                </div>
            )}
            {selectedTestDetail && <ChartComponent selectedTestDetail={selectedTestDetail} />}
        </div>
    );
}

export default DataDisplay;
