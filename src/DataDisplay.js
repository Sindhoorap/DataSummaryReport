import React, { useState, useEffect } from 'react';
import './styles.css'; 
import ChartComponent from './ChartComponent';
import ChartComponentTwo from './ChartComponentTwo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function DataDisplay({ testDetails }) {
    const [selectedTestId, setSelectedTestId] = useState('');
    const [selectedTestDetail, setSelectedTestDetail] = useState(null);
    const [testSettingsData, setTestSettingsData] = useState({});
    const [error, setError] = useState(null);
    const [showDisabledFeatures, setShowDisabledFeatures] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchPrompt, setShowSearchPrompt] = useState(false);
    const [testSettingsSearchQuery, setTestSettingsSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery) {
            const filteredDetails = testDetails.flatMap(detail =>
                Object.entries(detail).filter(([key, value]) =>
                    value.toString().toLowerCase().split(/\W+/).includes(searchQuery.toLowerCase())
                ).map(([key, value]) => ({ TestId: detail.TestId, matchKey: key, matchValue: value }))
            );

            if (filteredDetails.length > 0) {
                setSearchResults(filteredDetails);
                setShowSearchPrompt(true);
            } else {
                setSearchResults([]);
                setShowSearchPrompt(false);
            }
        } else {
            setSearchResults([]);
            setShowSearchPrompt(false);
        }
    }, [searchQuery, testDetails]);

    // Function to handle TestId selection change
    const handleTestIdChange = (id) => {
        setSelectedTestId(id);
        const selectedDetail = testDetails.find(detail => detail.TestId === id);
        setSelectedTestDetail(selectedDetail);

        // Fetch test settings based on the selected test ID
        fetchTestSettings(id);
    };

    // Fetch test settings based on the selected test ID
    const fetchTestSettings = (testId) => {
        fetch(`/testSettings{id}.json`) 
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

    // Filter out settings with values equal to 0
    const zeroValueSettings = Object.entries(testSettingsData).filter(([key, value]) => value === 0).map(([key]) => key);
    const nonZeroValueSettings = Object.entries(testSettingsData).filter(([key, value]) => value !== 0);

    // Filter the non-zero value settings based on the test settings search query
    const filteredNonZeroValueSettings = nonZeroValueSettings.filter(([key]) => key.toLowerCase().includes(testSettingsSearchQuery.toLowerCase()));

    // Toggle the visibility of disabled features box
    const toggleDisabledFeatures = () => {
        setShowDisabledFeatures(!showDisabledFeatures);
    };

    // Function to get the title for the first box based on the showDisabledFeatures state
    const getFirstBoxTitle = () => {
        return showDisabledFeatures ? "Feature Disabled" : "Test Settings";
    };

    // Function to get the title for the second box based on the showDisabledFeatures state
    const getSecondBoxTitle = () => {
        return showDisabledFeatures ? "Other Features" : "Test Settings";
    };

    // Function to handle search input change for test details
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle search input change for test settings
    const handleTestSettingsSearchChange = (event) => {
        setTestSettingsSearchQuery(event.target.value);
    };

    return (
        <div>
            <h1 className="test-details-title">Performance Test Results - NBCU US</h1>
            <hr className="title-line" />
            <div className="search-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            {showSearchPrompt && (
                <div className="search-results">
                    <p>Search Results for "{searchQuery}":</p>
                    <ul>
                        {searchResults.map((detail, index) => (
                            <li key={index} onClick={() => handleTestIdChange(detail.TestId)}>
                                <strong>TestId:</strong> {detail.TestId}<br />
                                <strong>{detail.matchKey}:</strong> {detail.matchValue.toString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
            {selectedTestDetail && (
                selectedTestId === 11111908765 ? 
                    <ChartComponentTwo selectedTestDetail={selectedTestDetail} /> : 
                    <ChartComponent selectedTestDetail={selectedTestDetail} />
            )}
            {selectedTestDetail && testSettingsData && (
                <div className="test-settings-container">
                    <div className="test-settings-box" onClick={toggleDisabledFeatures}>
                        <h2 className="left-aligned-title title-padding">{getFirstBoxTitle()}</h2>
                        <hr className="box-title-line" />
                        <ul>
                            {!showDisabledFeatures && <li>Click to view disabled and other features</li>}
                            {showDisabledFeatures && (
                                zeroValueSettings.map((key) => (
                                    <li key={key} className="setting-item">
                                       <span className="setting-name">{key}</span> 
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    {showDisabledFeatures && (
                        <div className="test-settings-box scrollable-box">
                            <div className="title-and-search">
                                <h2 className="left-aligned-title title-padding">{getSecondBoxTitle()}</h2>
                                <div className="search-container">
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={testSettingsSearchQuery}
                                        onChange={handleTestSettingsSearchChange}
                                        className="search-input"
                                    />
                                </div>
                            </div>
                            <hr className="box-title-line" />
                            <ul>
                                {filteredNonZeroValueSettings.map(([key, value]) => (
                                     <li key={key} className="setting-item">
                                        <span className="setting-name">{key}</span> 
                                        <span className="setting-value">{value}</span></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default DataDisplay;
