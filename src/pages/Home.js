import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import githubLogo from '../image/github-6980894_640.png';

function Home () {
    const [username, setUsername] = useState('');
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
  
    const handleSearch = async () => {
      if (!username) return;
  
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        if (response.status === 200) {
          navigate(`/user/${username}`);
        }
      } catch (error) {
        setNotFound(true);
      }
    };
  
    const handleChange = (e) => {
      setUsername(e.target.value);
      setNotFound(false); 
    };
  
    return (
      <div className="search-container">
        <img src={githubLogo} alt="GitHub Logo" className="github-logo" />
        <h1>GitHub User Finder</h1>
        <div className="search-form">
          <input
            type="text"
            value={username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter GitHub username"
          />
          {notFound && <p className="not-found">Not found</p>}
        </div>
      </div>
    );
  };
  

export default Home;
