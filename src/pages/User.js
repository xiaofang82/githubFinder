import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function User (){
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUser(response.data);

        // Fetch user's repositories
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, [username]);

  if (!user) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="user-container"
    >
      <div className="avatar-container">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="avatar-img"
        />
        <h2 className="username">{user.login}</h2>
      </div>
      <div className="user-stats">
        <p>Followers <br /><span className="stat-number">{user.followers}</span></p>
        <p>Following <br /><span className="stat-number">{user.following}</span></p>
        <p>Public Repos <br /><span className="stat-number">{user.public_repos}</span></p>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        Go to GitHub
      </a>
      {repos.length > 0 && (
        <div className="repo-list">
          <h3>My Repositories</h3>
          <ul>
            {repos.map(repo => (
              <li key={repo.id} className="repo-item">
                <div className='align-left'>
                  <h4 className="repo-name"><Link to={repo.html_url} target='_blank'>{repo.name}</Link></h4>
                  <p className="repo-description">{repo.description}</p>
                </div>
                <div className="repo-meta">
                  <p className="update-time">Updated at {new Date(repo.updated_at).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {repos.length === 0 && (
        <p className="no-repos-msg">No repositories found.</p>
      )}
    </motion.div>
  );
};

export default User;
