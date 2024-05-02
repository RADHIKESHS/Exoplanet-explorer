import React, { useState } from "react";
import "./App.css";
import { maxWeight as defaultMaxWeight, maxVolume as defaultMaxVolume, instruments as defaultInstruments } from "./Instruments";
import ManualMode from "./ManualMode";

function App() {
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [maxWeight, setMaxWeight] = useState(defaultMaxWeight);
  const [maxVolume, setMaxVolume] = useState(defaultMaxVolume);

  const calculateTotalValue = () => {
    return selectedInstruments.reduce((total, instrument) => total + instrument.value, 0);
  };

  const toggleInstrument = (instrument) => {
    const isSelected = selectedInstruments.some(item => item.id === instrument.id);
    if (isSelected) {
      setSelectedInstruments(selectedInstruments.filter(item => item.id !== instrument.id));
    } else {
      const totalWeight = selectedInstruments.reduce((total, item) => total + item.weight, 0);
      const totalVolume = selectedInstruments.reduce((total, item) => total + item.volume, 0);
      if (totalWeight + instrument.weight <= maxWeight && totalVolume + instrument.volume <= maxVolume) {
        setSelectedInstruments([...selectedInstruments, instrument]);
        setMessage('');
      } else {
        setMessage("Cannot add instrument. Exceeds spacecraft capacity.");
      }
    }
  };

  const toggleManualMode = () => {
    setManualMode(!manualMode);
    setMessage('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Exoplanet Exploration Mission</h1>
      <div className="controls">
        <label>
          Dark Mode:
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </label>
        <label>
          Manual Mode:
          <input
            type="checkbox"
            checked={manualMode}
            onChange={toggleManualMode}
          />
        </label>
      </div>
      {manualMode ? (
        <ManualMode
          maxWeight={maxWeight}
          maxVolume={maxVolume}
          defaultInstruments={defaultInstruments}
          onSubmit={({ maxWeight, maxVolume, instruments }) => {
            setMaxWeight(maxWeight);
            setMaxVolume(maxVolume);
            setManualMode(false);
          }}
        />
      ) : (
        <div>
          {/* Main page content goes here */}
          <div className="spacecraft-info">
            <h2>Spacecraft Capacity:</h2>
            <p>Maximum Weight: {maxWeight} kg</p>
            <p>Maximum Volume: {maxVolume} m<sup>3</sup></p>
          </div>
          <div className="instrument-selection">
            <h2>Select Instruments:</h2>
            <ul className="instrument-list">
              {defaultInstruments.map(instrument => (
                <li key={instrument.id} onClick={() => toggleInstrument(instrument)}>
                  <div className="instrument-info">
                    <span>Instrument {instrument.id}</span>
                    <span>Weight: {instrument.weight} kg</span>
                    <span>Volume: {instrument.volume} m<sup>3</sup></span>
                    <span>Value: {instrument.value}</span>
                  </div>
                  <div className="selection-indicator">
                    {selectedInstruments.some(item => item.id === instrument.id) ? '✔' : ''}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="selected-instruments">
            <h2>Selected Instruments:</h2>
            <ul>
              {selectedInstruments.map(instrument => (
                <li key={instrument.id}>
                  Instrument {instrument.id}: Weight {instrument.weight} kg, Volume {instrument.volume} m<sup>3</sup>, Value {instrument.value}
                </li>
              ))}
            </ul>
            <div className="message">{message}</div>
            <div className="total-info">
              <p>Total Weight: {selectedInstruments.reduce((total, instrument) => total + instrument.weight, 0)} kg</p>
              <p>Total Volume: {selectedInstruments.reduce((total, instrument) => total + instrument.volume, 0)} m<sup>3</sup></p>
              <p>Total Value: {calculateTotalValue()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
