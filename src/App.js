import React, { useState } from 'react';
import BitcoinPriceChart from './components/BitcoinPriceChart';
import FedInterestRatesOverlay from './components/FedInterestRatesOverlay';
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
      <BitcoinPriceChart />
      <FedInterestRatesOverlay bitcoinData={selectedCryptos} />
    </div>
  );
};

export default App;
