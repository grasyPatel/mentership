import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mentors');
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors: ', error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="mentor-list">
      <h2>Mentors</h2>
      <div className="mentors">
        {mentors.map((mentor) => (
          <Link key={mentor.id} to={`/mentors/${mentor.id}`} className="mentor">
            <img src={`http://localhost:5000/uploads/${mentor.image}`} alt={mentor.name} />
            <h3>{mentor.name}</h3>
            <p>{mentor.expertise}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MentorList;
