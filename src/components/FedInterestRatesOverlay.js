import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const FedInterestRatesOverlay = ({ bitcoinData, selectedCryptos }) => {
  const [fedRatesData, setFedRatesData] = useState([]);
  const [cryptoData, setCryptoData] = useState({});

  useEffect(() => {
    const fetchFedRatesData = async () => {
      const result = await axios.get(
        'https://api.stlouisfed.org/fred/series/observations',
        {
          params: {
            series_id: 'FEDFUNDS',
            api_key: 'YOUR_API_KEY',
            file_type: 'json',
            frequency: 'd',
            start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0],
          },
        }
      );
      setFedRatesData(result.data.observations);
    };

    const fetchCryptoData = async (crypto) => {
      const result = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: 7,
          },
        }
      );
      setCryptoData((prevData) => ({
        ...prevData,
        [crypto.id]: result.data.prices,
      }));
    };

    fetchFedRatesData();
    selectedCryptos.forEach((crypto) => {
      fetchCryptoData(crypto);
    });
  }, [selectedCryptos]);

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
      {
        label: 'FED Interest Rates',
        data: fedRatesData.map((rate) => rate.value),
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
      },
      ...selectedCryptos.map((crypto) => ({
        label: `${crypto.name} Price (USD)`,
        data: cryptoData[crypto.id]?.map((price) => price[1]) || [],
        fill: false,
        backgroundColor: 'rgba(255,206,86,0.4)',
        borderColor: 'rgba(255,206,86,1)',
      })),
    ],
  };

  return (
    <div>
      <h2>Bitcoin Price Chart with FED Interest Rates Overlay (Last 7 Days)</h2>
      <Line data={data} />
    </div>
  );
};

export default FedInterestRatesOverlay;
