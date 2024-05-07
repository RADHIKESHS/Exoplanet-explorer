import React, { useState } from "react";
import "./ExoplanetExplorer.css";

const instruments = [
  { id: 1, weight: 3, volume: 2, value: 10 },
  { id: 2, weight: 4, volume: 3, value: 15 },
  { id: 3, weight: 2, volume: 1, value: 8 },
  { id: 4, weight: 5, volume: 4, value: 20 },
];

function selectInstrumentsGreedy(payloadCapacity, volumeCapacity) {
  const sortedInstruments = instruments.sort(
    (a, b) => b.value / b.weight - a.value / a.weight
  ); // Sort by value-to-weight ratio
  let totalWeight = 0;
  let totalVolume = 0;
  let totalValue = 0;
  const selectedInstruments = [];

  for (const instrument of sortedInstruments) {
    if (
      totalWeight + instrument.weight <= payloadCapacity &&
      totalVolume + instrument.volume <= volumeCapacity
    ) {
      selectedInstruments.push(instrument);
      totalWeight += instrument.weight;
      totalVolume += instrument.volume;
      totalValue += instrument.value;
    }
  }

  return { selectedInstruments, totalWeight, totalVolume, totalValue };
}

function ExoplanetExplorer() {
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const spacecraftPayload = 10;
  const spacecraftVolume = 7;

  const handleSelection = () => {
    const result = selectInstrumentsGreedy(spacecraftPayload, spacecraftVolume);
    setSelectedInstruments(result.selectedInstruments);
    setTotalWeight(result.totalWeight);
    setTotalVolume(result.totalVolume);
    setTotalValue(result.totalValue);
  };

  const handleRefresh = () => {
    setSelectedInstruments([]);
    setTotalWeight(0);
    setTotalVolume(0);
    setTotalValue(0);
  };

  return (
    <div className="exoplanet-container">
      <h1>Exoplanet Explorer</h1>
      <hr/>
      <h2>Spacecraft Capacity:</h2>
      <p>Payload Capacity: {spacecraftPayload} kg</p>
      <p>
        Volume Capacity: {spacecraftVolume} m<sup>3</sup>
      </p>
      <hr/>
      <h2>Available Instruments:</h2>
      <ul>
        {instruments.map((instrument) => (
          <li key={instrument.id}>
            Instrument {instrument.id}: Weight {instrument.weight} kg, Volume{" "}
            {instrument.volume} m<sup>3</sup>, Value {instrument.value}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={handleSelection}>Select Instruments</button>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <hr/>
      <h2>Selected Instruments:</h2>
      <ul>
        {selectedInstruments.map((instrument) => (
          <li key={instrument.id}>
            Instrument {instrument.id}: Weight {instrument.weight} kg, Volume{" "}
            {instrument.volume} m<sup>3</sup>, Value {instrument.value}
          </li>
        ))}
      </ul>
      <hr />
      <div className="total-info">
        <h2>Total-Info</h2>
        <p>Total Weight: {totalWeight} kg</p>
        <p>
          Total Volume: {totalVolume} m<sup>3</sup>
        </p>
        <p>Total Scientific Value: {totalValue}</p>
      </div>
    </div>
  );
}

export default ExoplanetExplorer;
