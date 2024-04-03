import React, { useState } from 'react';
import axios from 'axios';

const Mentor = () => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('expertise', expertise);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/mentors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Mentor added successfully');
    } catch (error) {
      console.error('Error adding mentor: ', error);
      alert('Error adding mentor');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Mentor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Expertise</label>
          <input type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit">Add Mentor</button>
      </form>
    </div>
  );
};

export default Mentor;
