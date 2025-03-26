import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = ({ onAddCrypto, selectedCryptos }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await axios.get(
      'https://api.coingecko.com/api/v3/search',
      {
        params: {
          query,
        },
      }
    );
    setResults(result.data.coins);
  };

  const handleAddCrypto = (crypto) => {
    onAddCrypto(crypto);
    setQuery('');
    setResults([]);
  };

  return (
    <div>
      <h2>Search for Cryptocurrencies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a cryptocurrency..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} ({crypto.symbol})
            <button onClick={() => handleAddCrypto(crypto)}>Add</button>
          </li>
        ))}
      </ul>
      <h2>Selected Cryptocurrencies</h2>
      <ul>
        {selectedCryptos.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} ({crypto.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
