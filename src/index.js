import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom';
import './css/index.css';
import App from './App';
const basename = process.env.NODE_ENV === 'production' ? '/githubFinder' : '/';
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </React.StrictMode>
);
