import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MentorList from './components/MentorList';
import Chat from './components/Chat';
import Register from './components/Register';
import Login from './components/Login';
import Mentor from './components/Mentor';
import Profile from './components/Profile';
import SearchMentors from './components/SearchMentors';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/mentors" element={<MentorList/>} />
          <Route path="/mentors/:id" element={<Chat/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/add-mentor" element={<Mentor/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/search-mentors" element={<SearchMentors/>} />
          <Route path="/" element={<h1>Welcome to Virtual Mentor Hub</h1>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;


