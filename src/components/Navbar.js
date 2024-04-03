import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>Virtual Mentor Hub</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/mentors">Mentors</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/add-mentor">Add Mentor</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/search-mentors">Search Mentors</Link>
      </div>
    </nav>
  );
};

export default Navbar;
