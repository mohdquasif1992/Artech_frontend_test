import React, { useState, useEffect } from 'react';
import './App.css';
import bingLogo from './assets/bing.svg'; // Import Bing logo image

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() !== '') {
      fetchSearchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${query}&mkt=en-US`, {
        headers: {
          'Ocp-Apim-Subscription-Key': 'd06f37d2cb9b450ea8f24087c80eeb34',
        },
      });
      const data = await response.json();
      setResults(data.webPages.value); // Assuming you want to display web pages
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <a href="https://www.bing.com" target="_blank">
          <img src={bingLogo} className="logo bing" alt="Bing logo" />
        </a>
      </div>
      <h1>Bing Place Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button onClick={() => fetchSearchResults()}>Search</button>
      </div>
      <div className="results">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <h2><a href={result.url} target="_blank">{result.name}</a></h2>
            <p>{result.snippet}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
