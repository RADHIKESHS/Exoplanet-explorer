import React, { useState } from "react";
import "./App.css"; 
import ManualMode from "./ManualMode";
import ExoplanetExplorer from "./ExoplanetExplorer"; 

function App() {
  const [manualMode, setManualMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleManualMode = () => {
    setManualMode(!manualMode);
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
        <ManualMode /> 
      ) : (
        <ExoplanetExplorer /> 
      )}
    </div>
  );
}

export default App;
