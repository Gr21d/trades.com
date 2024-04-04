"use client"

import axios from 'axios';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {createChart, UTCTimestamp, ColorType, IChartApi, ISeriesApi, Time, WhitespaceData, LineData, LineSeriesOptions, LineStyleOptions, DeepPartial, SeriesOptionsCommon, CandlestickData, CandlestickSeriesOptions, CandlestickStyleOptions} from 'lightweight-charts'
import {jwtDecode} from 'jwt-decode';
import { decode } from 'punycode';
import Image from 'next/image';

import './crypto.css';

type CustomTimeType = UTCTimestamp;



function Details(props) {
    const [cryptoDetails, setCryptoDetails] = useState(null);
    const [ohlc, setOhlc] = useState(null);
    const [decodedToken, setDecodedToken] = useState(0)
    const [isStopped, setIsStopped] = useState(false);
    const [idPortfolioCrypto, setIdPortfolioCrypto] = useState(null);

    

    const getToken = () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('token');
      }
      return null;
    };
  
    const [chart, setChart] = useState<IChartApi | null>(null);
    const [candlestickSeries, setCandlestickSeries] = useState<ISeriesApi<"Candlestick", Time, WhitespaceData<Time> | CandlestickData<Time>, CandlestickSeriesOptions, DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>> | null>(null);
    const [error, setError] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [realTimePrice, setRealTimePrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 
    const [cryptoSymbol, setCryptoSymbol] = useState(null);
    const pathname = usePathname();
    const chartContainerRef = useRef(null)

    const [stopLoss, setStopLoss] = useState(null);
    const [takeProfit, setTakeProfit] = useState(null);

    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);


    const [buyAmount, setBuyAmount] = useState(0);

    let cryptoName = pathname ? pathname.substring(1) : null; 

    // change 1h%, change 24h%, change 7d%, Market Cap, Volume 24h
    useEffect(() => {
      const getToken = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
          return localStorage.getItem('token');
        }
        return null;
      };
  
      const token = getToken();
      if (token) {
        console.log('Token found:', jwtDecode(token))
        setDecodedToken(jwtDecode(token));
  
      } else {
        console.log('Token not found');
      }
    }, []);

    useEffect(() => {
      if (!cryptoName) {
        setIsLoading(true);
        return;
      }
    
      setIsLoading(true);
      let name = cryptoName.split("/")[2].toLowerCase();
      console.log('crypt', name);
    
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/catalogue/${name}`);
    
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
    
          const data = response.data;
          console.log('crypto details',data);
          setCryptoDetails(data);
          setCryptoSymbol(data.symbol.toUpperCase());
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error);
          setIsLoading(false);
        }
      };
    
      fetchData();
    }, [cryptoName]);

    useEffect(() => {
      if (!cryptoSymbol) {
        setIsLoading(true);
        return; 
      }
     
      setIsLoading(true);

      const fetchData = async () => {
        try {
          
          const response = await fetch(`/api/dashboard/${cryptoSymbol}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          setOhlc(data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [cryptoSymbol]); 


  
    useEffect(() => {
      fetch('/api/catalogue/crypto')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCryptos(data.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    let i = 1


    const handleBuyClick = async () => {
      if (window.confirm('Do you want to buy this crypto?')) {
        try {

          console.log('Investorid',decodedToken.investorId)
          console.log('portfolioid',decodedToken.portfolioId)
          console.log(realTimePrice)
          console.log(buyAmount)
          console.log(cryptoSymbol.toLowerCase())

          
          const response = await axios.post('/api/dashboard/transaction', {
            type: 'BUY',
            amount: buyAmount,
            investorId: decodedToken.investorId,
            portfolioId: decodedToken.portfolioId,
            currentPrice: realTimePrice,
            cryptoSymbol: cryptoSymbol.toLowerCase(),

          })

          if (response.status !== 200){
            throw new Error('Failed to create transaction')
          }

          setBuyAmount(0);
          setTransactionId(response.data.transactionId);
          alert(`Transaction successful bought at: ${realTimePrice}`)
          setIdPortfolioCrypto(response.data.cryptoPortfolioOwned.id);
          if(isStopped){
            const response = await axios.post('/api/dashboard/limit', {
              orderId: transactionId,
              currentPrice: realTimePrice,
            })
            if (response.status !== 200){
              throw new Error('Failed to create transaction')
            }
            alert('Transaction stopped')
          }

        }  catch (error) {
          console.error('Error buying crypto', error);
          alert('Error buying crypto');
        }
      }
    }

    const stop = async () => {
      try {
        const response = await axios.post('/api/dashboard/limit', {
          orderId: transactionId,
          currentPrice: realTimePrice,
        });
  
        if (response.status !== 200) {
          throw new Error('Failed to cancel buy order');
        }
  
        const { updatedBuyOrder } = response.data;
        console.log(updatedBuyOrder)
        setBuyAmount(0);
        setStopLoss(null);
        setTakeProfit(null);
        setTransactionId(null);
        
        alert('Transaction stopped');
      } catch (error) {
        console.error('Error canceling buy order:', error);
        alert('Error canceling buy order');
      }
    }
    const handleStopClick = async () => {
      if (window.confirm('Do you want to quit your position?')) {
        try {
          const response = await axios.post('/api/dashboard/limit', {
            orderId: transactionId,
            currentPrice: realTimePrice,
          });
    
          if (response.status !== 200) {
            throw new Error('Failed to cancel buy order');
          }
    
          const { updatedBuyOrder } = response.data;
          console.log(updatedBuyOrder)
          
          alert('Transaction stopped');
        } catch (error) {
          console.error('Error canceling buy order:', error);
          alert('Error canceling buy order');
        }
      }
    };


  useEffect(() => {
    if (chartContainerRef.current && ohlc && cryptoSymbol) {
      let newChart: IChartApi | null = null;

      if (!chart) {
        newChart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: 'rgb(23,23,23)' },
            textColor: 'white',
          },
          width: 1200,
          height: 800,
        });

        setChart(newChart);
      } else {
        newChart = chart;
      }

      const newCandlestickSeries = newChart.addCandlestickSeries();
      setCandlestickSeries(newCandlestickSeries);

      const lineSeries = newChart.addLineSeries();

      lineSeries.applyOptions({
        lineWidth: 2,
        color: "#45E5CB",
      });

      let data = ohlc.map(item => ({
        time: (item[0] / 1000) as CustomTimeType,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4])
      }));

      let from = data[0].time;
      let to = data[data.length - 1].time;

      let lineData = data.map(item => ({ time: item.time, value: (item.open + item.close) / 2 }));

      console.log('line', lineData);

      console.log('loaded');
      lineSeries.setData(lineData);
      newCandlestickSeries.setData(data);
      setCandlestickSeries(newCandlestickSeries);
    }
  }, [chartContainerRef.current, ohlc, cryptoSymbol]);

  useEffect(() => {
    if (cryptoSymbol) {
      let getLatest = cryptoName.split("/")[2];
      getLatest = getLatest.toLowerCase();

      let symbol = cryptoSymbol.toLowerCase();
      const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}usdt@kline_15m`);

      socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
      });

      socket.addEventListener('close', (event) => {
        console.log(`WebSocket connection closed: ${event.code} - ${event.reason}`);
      });

      socket.addEventListener('error', (error) => {
        console.error(`WebSocket error: ${error}`);
      });

      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        var candle = data.k;

        console.log('Candlestick update received:', typeof(candle.t));
        if (candlestickSeries) {
          console.log('Updating candlestick series');
          candlestickSeries.update({
            time: (candle.t / 1000) as CustomTimeType,
            open: parseFloat(candle.o),
            high: parseFloat(candle.h),
            low: parseFloat(candle.l),
            close: parseFloat(candle.c),
          });
        }

        setRealTimePrice(parseFloat(candle.c));

        if (transactionId) {
          console.log('sl', stopLoss);
          console.log('tk', takeProfit);
          if (stopLoss && parseFloat(candle.c) <= parseFloat(stopLoss)) {
            alert('Stop loss level reached');
            stop();
          }
          if (takeProfit && parseFloat(candle.c) >= parseFloat(takeProfit)) {
            alert('Take profit level reached');
            stop();
          }
        }
      });

      return () => {
        socket.close();
      };
    }
  }, [cryptoSymbol, transactionId, candlestickSeries]);

    

    useEffect(() => {
      
    }, []);

    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    

    return (
      <div>
        <h1>Details</h1>
    
        {cryptoDetails && (
          <div>
            <div>
              <label htmlFor="stopLoss">Stop Loss:</label>
              <input
                type="number"
                id="stopLoss"
                value={stopLoss || ''}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="Enter stop loss"
              />
            </div>
            <div>
              <label htmlFor="takeProfit">Take Profit:</label>
              <input
                type="number"
                id="takeProfit"
                value={takeProfit || ''}
                onChange={(e) => setTakeProfit(e.target.value)}
                placeholder="Enter take profit"
              />
            </div>
            <div>
              {cryptoDetails.name} <br />
              {cryptoDetails.symbol} <br />
              {cryptoDetails.currentPrice} <br />
              Real-time price: {realTimePrice !== null ? realTimePrice : 'Loading...'}
              <input
                type="number"
                value={buyAmount}
                onChange={(e) => setBuyAmount(parseFloat(e.target.value))}
                placeholder="Enter buy amount"
              />
              <button onClick={handleBuyClick}>Buy</button>
              <button onClick={handleStopClick}>Stop</button>
            </div>
          </div>
        )}
    
        <div className="trading-area">
          <div className="chart">
            {ohlc ? (
              <div ref={chartContainerRef}></div>
            ) : (
              <div>Loading chart...</div>
            )}
          </div>
          <div className="crypto">
            <table className="rwd-table1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Change 1h %</th>
                  <th>Change 24h %</th>
                  <th>Market Cap</th>
                  <th>Volume (24h)</th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((crypto, index) => (
                  <tr key={crypto.id}>
                    <td data-th="Name">{crypto.name}</td>
                    <td data-th="% Change 1h" style={{color: crypto.quote.USD.percent_change_1h >= 0 ? 'green' : 'red'}}>
                      {crypto.quote.USD.percent_change_1h.toFixed(2)}%
                      <Image src={crypto.quote.USD.percent_change_1h >= 0 ? "/up.png" : "/down.png"} alt="Change" width={20} height={20} />
                    </td>
                    <td data-th="% Change 24h" style={{color: crypto.quote.USD.percent_change_24h >= 0 ? 'green' : 'red'}}>
                      {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                      <Image src={crypto.quote.USD.percent_change_24h >= 0 ? "/up.png" : "/down.png"} alt="Change" width={20} height={20} />
                    </td>
                    <td data-th="Market Cap">${crypto.quote.USD.market_cap.toLocaleString()}</td>
                    <td data-th="Volume (24h)">${crypto.quote.USD.volume_24h.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>                
            <div className="crypto-details">
              Helloajsdopjafokaopdjfpoaskfpoas
            </div>
          </div>
        </div>
      </div>
    );
    
}

export default Details;
