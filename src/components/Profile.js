import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            'Authorization': localStorage.getItem('token')
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile: ', error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Full Name: {user.full_name}</p>
    </div>
  );
};

export default Profile;
