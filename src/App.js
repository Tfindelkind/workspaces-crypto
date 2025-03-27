import React, { useState } from 'react';
import BitcoinPriceChart from './components/BitcoinPriceChart';
import SearchBox from './components/SearchBox';

const App = () => {
  const [selectedCryptos, setSelectedCryptos] = useState([]);

  const handleAddCrypto = (crypto) => {
    setSelectedCryptos([...selectedCryptos, crypto]);
  };

  return (
    <div>
      <h1>Crypto Dashboard</h1>
      <SearchBox onAddCrypto={handleAddCrypto} />
      <h2>Top 3 Cryptocurrencies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bitcoin</td>
            <td>BTC</td>
          </tr>
          <tr>
            <td>Ethereum</td>
            <td>ETH</td>
          </tr>
          <tr>
            <td>Solana</td>
            <td>SOL</td>
          </tr>
        </tbody>
      </table>
      <h2>Selected Cryptocurrencies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {selectedCryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BitcoinPriceChart selectedCryptos={selectedCryptos} />
    </div>
  );
};

export default App;
