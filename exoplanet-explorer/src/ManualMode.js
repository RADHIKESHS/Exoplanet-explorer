import React, { useState } from "react";
import "./ManualMode.css";

const ManualMode = () => {
  const [maxWeight, setMaxWeight] = useState("");
  const [maxVolume, setMaxVolume] = useState("");
  const [availableInstruments, setAvailableInstruments] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [instrument, setInstrument] = useState({
    weight: "",
    volume: "",
    value: "",
  });

  const handleInstrumentChange = (e) => {
    const { name, value } = e.target;
    setInstrument((prevState) => ({ ...prevState, [name]: value }));
  };

  const addInstrument = () => {
    if (instrument.weight && instrument.volume && instrument.value) {
      setAvailableInstruments((prevState) => [...prevState, { ...instrument }]);
      setInstrument({ weight: "", volume: "", value: "" });
    }
  };

  const removeInstrument = (index) => {
    setAvailableInstruments((prevState) =>
      prevState.filter((_, i) => i !== index)
    );
  };

  const calculateSelectedInstruments = () => {
    if (maxWeight && maxVolume && availableInstruments.length > 0) {
      const result = selectInstrumentsGreedy(
        parseFloat(maxWeight),
        parseFloat(maxVolume),
        availableInstruments
      );
      setSelectedInstruments(result.selectedInstruments);
    }
  };

  const handleRefresh = () => {
    setMaxWeight("");
    setMaxVolume("");
    setAvailableInstruments([]);
    setSelectedInstruments([]);
    setInstrument({ weight: "", volume: "", value: "" });
  };

  const calculateTotalValue = (instruments) => {
    return instruments.reduce(
      (total, instrument) => total + parseFloat(instrument.value),
      0
    );
  };

  const calculateTotalWeight = (instruments) => {
    return instruments.reduce(
      (total, instrument) => total + parseFloat(instrument.weight),
      0
    );
  };

  const calculateTotalVolume = (instruments) => {
    return instruments.reduce(
      (total, instrument) => total + parseFloat(instrument.volume),
      0
    );
  };

  const selectInstrumentsGreedy = (payloadCapacity,volumeCapacity,instruments) => {
    const sortedInstruments = instruments.sort((a, b) => b.value / b.weight - a.value / a.weight); // Sort by value-to-weight ratio
    let totalWeight = 0;
    let totalVolume = 0;
    const selectedInstruments = [];

    for (const instrument of sortedInstruments) {
      if (
        totalWeight + parseFloat(instrument.weight) <= payloadCapacity &&
        totalVolume + parseFloat(instrument.volume) <= volumeCapacity
      ) {
        selectedInstruments.push(instrument);
        totalWeight += parseFloat(instrument.weight);
        totalVolume += parseFloat(instrument.volume);
      }
    }

    return { selectedInstruments, totalWeight, totalVolume };
  };

  return (
    <div className="manual-mode-container">
      <h2>Manual Mode</h2>
      <div className="section">
        <h3>Spacecraft Capacity</h3>
        <div className="divider"></div>
        <h3>Add Instrument</h3>
      </div>
      <div className="inputs-container">
        <div className="spacecraft-inputs">
          <label>Maximum Weight:</label>
          <input
            type="number"
            value={maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
          />
          <label>Maximum Volume:</label>
          <input
            type="number"
            value={maxVolume}
            onChange={(e) => setMaxVolume(e.target.value)}
          />
        </div>
        <div className="instrument-inputs">
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={instrument.weight}
            onChange={handleInstrumentChange}
          />
          <label>Volume:</label>
          <input
            type="number"
            name="volume"
            value={instrument.volume}
            onChange={handleInstrumentChange}
          />
          <label>Value:</label>
          <input
            type="number"
            name="value"
            value={instrument.value}
            onChange={handleInstrumentChange}
          />
        </div>
      </div>
      <button onClick={addInstrument}>Add</button>
      <hr />
      <div>
        <h2>Available Instruments:</h2>
        <ul>
          {availableInstruments.map((instr, index) => (
            <li key={index}>
              Instrument {index + 1}: Weight {instr.weight} kg, Volume{" "}
              {instr.volume} m<sup>3</sup>, Value {instr.value}
              <button
                onClick={() => removeInstrument(index)}
                className="remove-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="button-container">
        <button onClick={calculateSelectedInstruments}>
          Calculate Selected Instruments
        </button>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <hr />
      <h2>Selected Instruments:</h2>
      <ul>
        {selectedInstruments.map((instr, index) => (
          <li key={index}>
            Instrument {index + 1}: Weight {instr.weight} kg, Volume{" "}
            {instr.volume} m<sup>3</sup>, Value {instr.value}
          </li>
        ))}
      </ul>
      <hr />
      <div className="total-info">
        <h2>Total-Info</h2>
        <p>Total Weight: {calculateTotalWeight(selectedInstruments)} kg</p>
        <p>
          Total Volume: {calculateTotalVolume(selectedInstruments)} m
          <sup>3</sup>
        </p>
        <p>Total Value: {calculateTotalValue(selectedInstruments)}</p>
      </div>
    </div>
  );
};

export default ManualMode;
