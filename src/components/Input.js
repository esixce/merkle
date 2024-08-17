import React, { useState } from 'react';

const Input = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    timeOfBirth: '',
    locationOfBirth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div>
      <h2>Chinese Zodiac Birth Chart</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time of Birth:</label>
          <input
            type="time"
            name="timeOfBirth"
            value={formData.timeOfBirth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location of Birth:</label>
          <input
            type="text"
            name="locationOfBirth"
            value={formData.locationOfBirth}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Generate Birth Chart</button>
      </form>
    </div>
  );
};

export default Input;
