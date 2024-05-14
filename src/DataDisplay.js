import React, { useState } from 'react';
import './styles.css'; // Import the CSS file for styling
import ChartComponent from './ChartComponent';

function DataDisplay({ testDetails }) {
    const [selectedTestId, setSelectedTestId] = useState('');
    const [selectedTestDetail, setSelectedTestDetail] = useState(null);
    const [testSettingsData, setTestSettingsData] = useState({});
    const [error, setError] = useState(null);
    const totalKeys = Object.keys(testSettingsData).length;
    const splitIndex = Math.ceil(totalKeys * 0.48); // Splitting at 60%

    // Function to handle TestId selection change
    const handleTestIdChange = (event) => {
        const id = parseInt(event.target.value);
        setSelectedTestId(id);
        const selectedDetail = testDetails.find(detail => detail.TestId === id);
        setSelectedTestDetail(selectedDetail);

        // Fetch test settings based on the selected test ID
        fetchTestSettings(id);
    };

    // Fetch test settings based on the selected test ID
    const fetchTestSettings = (testId) => {
        // Assuming the test settings data is stored in a JSON file named 'testSettings.json'
        fetch(`/testSettings{id}.json`) // Adjust the path based on your file structure
            .then(response => response.json())
            .then(data => {
                setTestSettingsData(data);
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                console.error('Error fetching test settings:', error);
                setError('Error fetching test settings');
            });
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
                    <div className="test-details-row">
                        {/* Render selected test details */}
                        <div className="test-details-box">
                            <p className="test-id">
                                <strong>Test ID</strong> 
                            </p>
                            <p className="selected-test-id">{selectedTestDetail.TestId}</p>
                        </div>
                        <div className="test-details-box">
                            <p className="test-id">
                                <strong>Run Date</strong>
                            </p>
                            <p className="selected-test-id">{selectedTestDetail.RunDate}</p>
                        </div>
                        {/* Add other test details boxes in the first row */}
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
                            <p className="selected-test-id">{selectedTestDetail.PeakNumber}</p>
                        </div>
                        <div className="test-details-box">
                            <p className="test-id">
                                <strong>Peak Duration</strong> 
                            </p>
                            <p className="selected-test-id">{selectedTestDetail.PeakDuration}</p>
                        </div>
                        <div className="test-details-box">
                            <p className="test-id">
                                <strong>Status</strong> 
                            </p>
                            <p className="selected-test-id">{selectedTestDetail.Status}</p>
                        </div>
                    </div>
                    <div className="test-details-row test-details-row-right">
                        <div className="test-details-box">
                            <p className="test-id">
                                <strong>Description</strong> 
                            </p>
                            <p className="selected-test-id">{selectedTestDetail.Description}</p>
                        </div>
                        {/* Add other test details boxes in the second row */}
                    </div>
                </div>
            )}
            {/* Render chart component based on selected test */}
            {selectedTestDetail && <ChartComponent selectedTestDetail={selectedTestDetail} />}
            {/* Box containing test settings information */}
            {selectedTestDetail && testSettingsData && (
                <div className="test-settings-container">
                    <div className="test-settings-box">
                        <h2>Test Settings</h2>
                        <ul>
                            {Object.entries(testSettingsData).slice(0, splitIndex).map(([key, value]) => (
                                <li key={key}><strong>{key}:</strong> {value}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="test-settings-box">
                       
                        <ul>
                            {Object.entries(testSettingsData).slice(splitIndex).map(([key, value]) => (
                                <li key={key}><strong>{key}:</strong> {value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {/* Error message */}
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default DataDisplay;
