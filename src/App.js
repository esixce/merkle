import React, { useState } from 'react';
import Input from './components/Input';

function App() {
  const [birthData, setBirthData] = useState(null);

  const handleFormSubmit = (formData) => {
    setBirthData(formData);
  };

  return (
    <div className="App">
      <Input onFormSubmit={handleFormSubmit} />
      {birthData && (
        <div>
          <h3>Your Birth Data:</h3>
          <p>Date of Birth: {birthData.dateOfBirth}</p>
          <p>Time of Birth: {birthData.timeOfBirth}</p>
          <p>Location of Birth: {birthData.locationOfBirth}</p>
        </div>
      )}
    </div>
  );
}

export default App;
