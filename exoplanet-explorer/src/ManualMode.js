import React, { useState } from 'react';
import './ManualMode.css'; 

const ManualMode = ({ onSubmit }) => {
    const [maxWeight, setMaxWeight] = useState('');
    const [maxVolume, setMaxVolume] = useState('');
    const [instrumentsData, setInstrumentsData] = useState([]);
    const [instrument, setInstrument] = useState({ weight: '', volume: '', value: '' });
    const [message, setMessage] = useState('');

    const handleInstrumentChange = (e) => {
        const { name, value } = e.target;
        setInstrument(prevState => ({ ...prevState, [name]: value }));
    };

    const addInstrument = () => {
        const totalWeight = instrumentsData.reduce((total, item) => total + parseFloat(item.weight), 0);
        const totalVolume = instrumentsData.reduce((total, item) => total + parseFloat(item.volume), 0);
        if (instrument.weight && instrument.volume && instrument.value) {
            if (totalWeight + parseFloat(instrument.weight) <= maxWeight && totalVolume + parseFloat(instrument.volume) <= maxVolume) {
                setInstrumentsData(prevState => [...prevState, { ...instrument }]);
                setInstrument({ weight: '', volume: '', value: '' });
                setMessage('');
            } else {
                setMessage("Cannot add instrument. Exceeds spacecraft capacity.");
            }
        }
    };

    const removeInstrument = (index) => {
        setInstrumentsData(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (maxWeight && maxVolume && instrumentsData.length > 0) {
            onSubmit({ maxWeight: parseFloat(maxWeight), maxVolume: parseFloat(maxVolume), instruments: instrumentsData });
        }
    };

    const handleRefresh = () => {
        setMaxWeight('');
        setMaxVolume('');
        setInstrumentsData([]);
        setInstrument({ weight: '', volume: '', value: '' });
        setMessage('');
    };

    const calculateTotalValue = () => {
        return instrumentsData.reduce((total, instrument) => total + parseFloat(instrument.value), 0);
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
                    <input type="number" value={maxWeight} onChange={(e) => setMaxWeight(e.target.value)} />
                    <label>Maximum Volume:</label>
                    <input type="number" value={maxVolume} onChange={(e) => setMaxVolume(e.target.value)} />
                </div>
                <div className="instrument-inputs">
                    <label>Weight:</label>
                    <input type="number" name="weight" value={instrument.weight} onChange={handleInstrumentChange} />
                    <label>Volume:</label>
                    <input type="number" name="volume" value={instrument.volume} onChange={handleInstrumentChange} />
                    <label>Value:</label>
                    <input type="number" name="value" value={instrument.value} onChange={handleInstrumentChange} />
                </div>
            </div>
            <button onClick={addInstrument}>Add</button>
            <div>
            {message && <div className="message">{message}</div>}
                <h3>Selected Instruments:</h3>
                <ul>
                    {instrumentsData.map((instr, index) => (
                        <li key={index}>
                            Instrument {index + 1}: Weight {instr.weight} kg, Volume {instr.volume} m<sup>3</sup>, Value {instr.value}
                            <button onClick={() => removeInstrument(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className="total-info">
                    <p>Total Weight: {instrumentsData.reduce((total, instrument) => total + parseFloat(instrument.weight), 0)} kg</p>
                    <p>Total Volume: {instrumentsData.reduce((total, instrument) => total + parseFloat(instrument.volume), 0)} m<sup>3</sup></p>
                    <p>Total Value: {calculateTotalValue()}</p>
                </div>
                
            </div>
            <button onClick={handleRefresh}>Refresh</button>
        </div>
    );
};

export default ManualMode;
