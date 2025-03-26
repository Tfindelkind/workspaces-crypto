import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const BitcoinPriceChart = () => {
  const [bitcoinData, setBitcoinData] = useState([]);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      const result = await axios.get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
        {
          params: {
            vs_currency: 'usd',
            days: 7,
          },
        }
      );
      setBitcoinData(result.data.prices);
    };

    fetchBitcoinData();
  }, []);

  const data = {
    labels: bitcoinData.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: bitcoinData.map((price) => price[1]),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h2>Bitcoin Price Chart (Last 7 Days)</h2>
      <Line data={data} />
    </div>
  );
};

export default BitcoinPriceChart;
