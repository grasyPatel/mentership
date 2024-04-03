import React, { useState } from 'react';
import axios from 'axios';

const SearchMentors = () => {
  const [query, setQuery] = useState('');
  const [mentors, setMentors] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search-mentors?query=${query}`);
      setMentors(response.data);
    } catch (error) {
      console.error('Error searching mentors: ', error);
    }
  };

  return (
    <div className="search-mentors">
      <h2>Search Mentors</h2>
      <input
        type="text"
        placeholder="Search by name or expertise..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="mentors">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="mentor">
            <img src={`http://localhost:5000/uploads/${mentor.image}`} alt={mentor.name} />
            <h3>{mentor.name}</h3>
            <p>{mentor.expertise}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMentors;
