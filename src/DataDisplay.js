import React, { useState } from 'react';
import './styles.css'; // Import the CSS file for styling
import ChartComponent from './ChartComponent';

function DataDisplay({ testDetails }) {
    const [selectedTestId, setSelectedTestId] = useState('');
    const [selectedTestDetail, setSelectedTestDetail] = useState(null);
    const [testSettingsData, setTestSettingsData] = useState({});
    const [error, setError] = useState(null);

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
        fetch(`/testSettings{id}.json`) // Adjust the path based on your file structure
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
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

    // Filter out settings with values equal to 0
    const zeroValueSettings = Object.entries(testSettingsData).filter(([key, value]) => value === 0);
    const nonZeroValueSettings = Object.entries(testSettingsData).filter(([key, value]) => value !== 0);

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
                    </div>
                </div>
            )}
            {selectedTestDetail && <ChartComponent selectedTestDetail={selectedTestDetail} />}
            {selectedTestDetail && testSettingsData && (
                <div className="test-settings-container">
                    <div className="test-settings-box zero-values-box">
                        <h2>Settings with Value 0</h2>
                        <hr className="box-title-line" />
                        <ul>
                            {zeroValueSettings.map(([key, value]) => (
                                <li key={key}><span className="setting-name">{key}:</span> <span className="setting-value">{value}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="test-settings-box scrollable-box">
                        <h2>Other Settings</h2>
                        <hr className="box-title-line" />
                        <ul>
                            {nonZeroValueSettings.map(([key, value]) => (
                                <li key={key}><span className="setting-name">{key}:</span> <span className="setting-value">{value}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default DataDisplay;
