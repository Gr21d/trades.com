"use client"

import axios from 'axios';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {createChart, UTCTimestamp, ColorType, IChartApi, ISeriesApi, Time, WhitespaceData, LineData, LineSeriesOptions, LineStyleOptions, DeepPartial, SeriesOptionsCommon, CandlestickData, CandlestickSeriesOptions, CandlestickStyleOptions, CrosshairMode, LineStyle} from 'lightweight-charts';
import {jwtDecode} from 'jwt-decode';
import { decode } from 'punycode';
import {rsi2, bollingerBands} from 'indicatorts';
import Image from 'next/image';

import information from '../../.././public/information.png';

import Header from '../../../app/components/Header';
import Footer from '../../../app/components/Footer';

import './crypto.css';

type CustomTimeType = UTCTimestamp;



function Details(props) {
    const [cryptoDetails, setCryptoDetails] = useState(null);
    const [ohlc, setOhlc] = useState(null);
    const [decodedToken, setDecodedToken] = useState(0)
    const [isStopped, setIsStopped] = useState(false);
    const [data, setData] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [prevPrice, setPrevPrice] = useState(0.0);
    const [shortSellAmount, setShortSellAmount] = useState(0);

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

    const [open, setOpen] = useState(null);
    const [high, setHigh] = useState(null);
    const [low, setLow] = useState(null);
    const [close, setClose] = useState(null);

    const [supplyPercentage, setSupplyPercentage] = useState(0);


    const [buyAmount, setBuyAmount] = useState(0.00);







    const [bollingerLowBands, setBollingerLowBands] = useState<ISeriesApi<"Line", Time, WhitespaceData<Time> | LineData<Time>, LineSeriesOptions, DeepPartial<LineStyleOptions & SeriesOptionsCommon>> | null>(null);
    const [bollingerMidBands, setBollingerMidBands] = useState<ISeriesApi<"Line", Time, WhitespaceData<Time> | LineData<Time>, LineSeriesOptions, DeepPartial<LineStyleOptions & SeriesOptionsCommon>> | null>(null);
    const [bollingerUpBands, setBollingerUpBands] = useState<ISeriesApi<"Line", Time, WhitespaceData<Time> | LineData<Time>, LineSeriesOptions, DeepPartial<LineStyleOptions & SeriesOptionsCommon>> | null>(null);






    

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

          console.log('crypto details spec', response);
    
          const data = response.data;
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

    const calculateCirculatingSupplyPercentage = () => {
      const max_supply = cryptoDetails.market_data.total_supply;
      const circulating_supply = cryptoDetails.market_data.circulating_supply;
    
      // Check if max_supply or circulating_supply is null, undefined, or 0
      if (!max_supply || !circulating_supply || max_supply === 0) {
        // Return a default value or handle the case as per your requirements
        return 'N/A'; // or return 0, -1, or any other value
      }
    
      const percentage = ((circulating_supply / max_supply) * 100).toFixed(2);
      return percentage;
    };

    useEffect(() => {
      if (cryptoDetails) {
        const percentage = calculateCirculatingSupplyPercentage();
        setSupplyPercentage(percentage);
      }
    },[cryptoDetails])

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

          setBuyAmount(0.00);
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
          // alert('Error buying crypto');
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
        setBuyAmount(0.00);
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
    if (realTimePrice !== null) {
      setPrevPrice(realTimePrice);
    }
  }, [realTimePrice]);


  
  useEffect(() => {
    if (chartContainerRef.current && ohlc && cryptoSymbol) {
      let newChart: IChartApi | null = null;

      if (!chart) {
        newChart = createChart(chartContainerRef.current, {
          layout: {
            background: {
              type: ColorType.Solid,
              color: 'transparent'
            },
            textColor: 'black',
          },
          grid: {
            vertLines: {
              color: 'transparent',
              style: LineStyle.Solid,
            },
            horzLines: {
              color: 'rgb(241,244,246)',
              style: LineStyle.Solid,
            },
          },
          crosshair: {
            mode: CrosshairMode.Normal,
          },
          rightPriceScale: {
            borderColor: '#cccccc',
          },
          timeScale: {
            borderColor: '#cccccc',
            timeVisible: true,
            secondsVisible: false,
            fixLeftEdge: true,
            visible: true,
            rightOffset: 10,
            barSpacing: 15,
          },
          width: 900,
          height: 800,
        })
        setChart(newChart);
      } else {
        newChart = chart;
      }

      const newCandlestickSeries = newChart.addCandlestickSeries();
      setCandlestickSeries(newCandlestickSeries);

      // const lineSeries = newChart.addLineSeries();

      // lineSeries.applyOptions({
      //   lineWidth: 2,
      //   color: "#45E5CB",
      //   priceScaleId: '',
      // });

      let data = ohlc.map(item => ({
        time: (item[0] / 1000) as CustomTimeType,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4])
      }));

      console.log('data', data)

      let from = data[0].time;
      let to = data[data.length - 1].time;
      let lineData = data.map(item => ({ time: item.time, value: (item.open + item.close) / 2 }));
      
      const rsiValues = rsi2(data.map(d => d.close));

      const volume = ohlc.map(item => ({
        value: parseFloat(item[5]),
      }))

      const rsiData = data.map((d, i) => ({
        time: d.time,
        value: rsiValues[i],
      }));

      const bollingValues = bollingerBands(data.map(d => d.close));

      const lowerBand = bollingValues.lowerBand
      const upperBand = bollingValues.upperBand
      const middleBand = bollingValues.middleBand

      const lowerBandData = data.map((d, i) => ({
        time: d.time,
        value: lowerBand[i],
      }));

      const upperBandData = data.map((d, i) => ({
        time: d.time,
        value: upperBand[i],
      }));


      const middleBandData = data.map((d, i) => ({
        time: d.time,
        value: middleBand[i],
      }));

  
      const bollingUpSeries = newChart.addLineSeries({
        color: 'rgb(109,143,247)',
        lineWidth: 1,
        priceScaleId: 'right',
      });
      
      const bollingLowSeries = newChart.addLineSeries({
        color: 'rgb(109,143,247)',
        lineWidth: 1,
        priceScaleId: 'right',
      });
      
      const bollingMidSeries = newChart.addLineSeries({
        color: 'orange',
        lineWidth: 1,
        priceScaleId: 'right',
      });
      
      bollingUpSeries.setData(upperBandData);
      bollingLowSeries.setData(lowerBandData);
      bollingMidSeries.setData(middleBandData);

      setBollingerLowBands(bollingLowSeries);
      setBollingerMidBands(bollingMidSeries);
      setBollingerUpBands(bollingUpSeries);

      let vol = ohlc.map(item => ({
        time: (item[0] / 1000) as CustomTimeType,
        value: parseFloat(item[5]),
      }));

      const histogramData = vol.map((d, i) => ({
        time: d.time,
        value: d.value,
        color: 'rgb(242,244,247)',
      }));

      const volumeSeries = newChart.addHistogramSeries({
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '',
    });

      volumeSeries.priceScale().applyOptions({
          scaleMargins: {
              top: 0.8, 
              bottom: 0,
          },
      });

      volumeSeries.setData(histogramData);


      const container = document.getElementById('chart-container')
      const toolTipWidth = 240;
      const toolTipHeight = 120;
      const toolTipMargin = 15;

      const toolTip = document.createElement('div');
      toolTip.style = `width: 240px; height: 165px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 5px; left: 5px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: Inter,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
      toolTip.style.background = 'white';
      toolTip.style.color = 'black';
      toolTip.style.borderColor = '#2962FF';
      toolTip.style.borderRadius = '10px';
      container.appendChild(toolTip);

      newChart.subscribeCrosshairMove(param => {
        if (
            param.point === undefined ||
            !param.time ||
            param.point.x < 0 ||
            param.point.y < 0
        ) {
            toolTip.style.display = 'none';
          } else {
            let dateStr = param.time as CustomTimeType;
            const time = convertEpochToDate(dateStr);
            toolTip.style.display = 'block';
            const data = param.seriesData.get(newCandlestickSeries);
            const price = data.close !== undefined ? data.close : data.close;
            const open = data.open !== undefined ? data.open : data.open;
            const high = data.high !== undefined ? data.high : data.high;
            const low = data.low !== undefined ? data.low : data.low;
            const close = data.close !== undefined ? data.close : data.close;
            console.log('price', open);
          
            toolTip.innerHTML = `
              <div class="tooltip-container">
                <div class="tooltip-title">
                 <div class="flex-title">
                    <Image src=${cryptoDetails.image.small} alt="cryptoImage" width=${20} height=${20}></Image>
                    ${cryptoSymbol}
                 </div>
                  <div class="tooltip-date">${time}</div>
                </div>
                <div class="tooltip-price">${price.toFixed(2)}</div>
                <div class="tooltip-ohlc">Open: <b>$${open.toFixed(2)}</b></div>
                <div class="tooltip-ohlc">High: <b>$${high.toFixed(2)}</b></div>
                <div class="tooltip-ohlc">Low: <b>$${low.toFixed(2)}</b></div>
                <div class="tooltip-ohlc">Close: <b>$${close.toFixed(2)}</b></div>
                <div class="tooltip-ohlc">
                Change: <span style="color: ${open - close >= 0 ? 'rgb(91,193,137)' : 'rgb(216,73,74)'}; font-weight: bold;">$${Math.abs(open - close).toFixed(2)} (${((open - close) / close * 100).toFixed(2)}%)</span>
              </div>
                
              </div>
            `;

            const y = param.point.y;
            let left = param.point.x + toolTipMargin;
            if (left > container.clientWidth - toolTipWidth) {
                left = param.point.x - toolTipMargin - toolTipWidth;
            }
    
            let top = y + toolTipMargin;
            if (top > container.clientHeight - toolTipHeight) {
                top = y - toolTipHeight - toolTipMargin;
            }
            toolTip.style.left = left + 'px';
            toolTip.style.top = top + 'px';
        }
    });


    function convertEpochToDate(epochSeconds) {
      const epochMilliseconds = epochSeconds * 1000;
      
      const date = new Date(epochMilliseconds);
      
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      
      const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}`;
      return formattedDateTime;
  }
      // const rsiSeries = newChart.addLineSeries({
      //   color: 'red',
      //   lineWidth: 1 ,
      //   priceScaleId: '',
      // });
      
      // rsiSeries.setData(rsiData);
      
      // rsiSeries.priceScale().applyOptions({
      //   scaleMargins: {
      //     top: 0.9, 
      //     bottom: 0,
      //   },
      // });

      console.log('loaded');
      // lineSeries.setData(lineData);
      newCandlestickSeries.setData(data);
      setCandlestickSeries(newCandlestickSeries);

      // newChart.timeScale().fitContent();
      
    }
  }, [chartContainerRef.current, ohlc, cryptoSymbol]);


  const getPriceColor = () => {
    if (realTimePrice === null || prevPrice === null) {
      return 'black';
    }
    return realTimePrice > prevPrice ? 'green' : realTimePrice < prevPrice ? 'red' : 'black';
  };

  const removeBollingBands = (newChart, bollingUpSeries, bollingLowSeries, bollingMidSeries) => {
    newChart.removeSeries(bollingUpSeries);
    newChart.removeSeries(bollingLowSeries);
    newChart.removeSeries(bollingMidSeries);
  }

  const addBollingBands = (newChart) => {
    if (newChart && ohlc) {

      let data = ohlc.map(item => ({
        time: (item[0] / 1000) as CustomTimeType,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4])
      }));

      const bollingValues = bollingerBands(data.map(d => d.close));

      const lowerBand = bollingValues.lowerBand
      const upperBand = bollingValues.upperBand
      const middleBand = bollingValues.middleBand

      const lowerBandData = data.map((d, i) => ({
        time: d.time,
        value: lowerBand[i],
      }));


      const upperBandData = data.map((d, i) => ({
        time: d.time,
        value: upperBand[i],
      }));


      const middleBandData = data.map((d, i) => ({
        time: d.time,
        value: middleBand[i],
      }));

  
      const bollingUpSeries = newChart.addLineSeries({
        color: 'blue',
        lineWidth: 1,
        priceScaleId: 'left',
      });
      
      const bollingLowSeries = newChart.addLineSeries({
        color: 'blue',
        lineWidth: 1,
        priceScaleId: 'left',
        
      });
      
      const bollingMidSeries = newChart.addLineSeries({
        color: 'red',
        lineWidth: 1,
        priceScaleId: 'left',
      });
      
      bollingUpSeries.setData(upperBandData);
      bollingLowSeries.setData(lowerBandData);
      bollingMidSeries.setData(middleBandData);

      newChart.addLineSeries(bollingUpSeries);
      newChart.addLineSeries(bollingLowSeries);
      newChart.addLineSeries(bollingMidSeries);
    }
  }

  const handleBollingClick = (newChart) => {
    if (newChart) {
      bollingerUpBands.applyOptions(
        {
          priceScaleId: '',
        }
      );
      bollingerLowBands.applyOptions(
        {
          priceScaleId: '',
        }
      );
      bollingerMidBands.applyOptions(
        {
          priceScaleId: '',
        }
      );
      console.log('removed')
    }
  }

  useEffect(()=> {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`/api/dashboard/portfolio/${decodedToken.portfolioId}`);
        console.log('response data', response.data)

  
        if (response.status === 200) {
          setPortfolio(response.data);
        } else {
          throw new Error('Failed to fetch portfolio data');
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

  
    if (decodedToken && decodedToken.portfolioId) {
      fetchPortfolioData();
    }

  }, [decodedToken, transactionId]);

  const changeColorBuy = () => {
    const buy = document.getElementById('buy');
    const sell = document.getElementById('sell');
    const buybtn = document.getElementsByClassName('buybtn')[0];
    const shortbtn = document.getElementsByClassName('shortbtn')[0];
    const header = document.getElementsByClassName('header-element')[0];
  
    buy.style.backgroundColor = 'white';
    sell.style.backgroundColor = 'rgb(241,244,246)';
    buybtn.style.display = 'block';
    shortbtn.style.display = 'none';
    // buy.style.width = '100%';
    // buy.style.textAlign = 'center';
  };
  
  const changeColorSell = () => {
    const buy = document.getElementById('buy');
    const sell = document.getElementById('sell');
    const buybtn = document.getElementsByClassName('buybtn')[0];
    const shortbtn = document.getElementsByClassName('shortbtn')[0];

    buy.style.backgroundColor = 'rgb(241,244,246)';
    sell.style.backgroundColor = 'white';
    buybtn.style.display = 'none';
    shortbtn.style.display = 'block';
  } 

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

        setClose(candle.c);
        setOpen(candle.o);
        setHigh(candle.h);
        setLow(candle.l);
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


    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleShortSellClick = async () => {
      if (window.confirm('Do you want to short sell this crypto?')) {
        try {
          const response = await axios.post('/api/dashboard/transaction', {
            type: 'SHORT_SELL',
            amount: shortSellAmount,
            investorId: decodedToken.investorId,
            portfolioId: decodedToken.portfolioId,
            currentPrice: realTimePrice,
            cryptoSymbol: cryptoSymbol.toLowerCase(),
          });
    
          if (response.status !== 200) {
            throw new Error('Failed to create short sell transaction');
          }
    
          setShortSellAmount(0);
          alert(`Short sell transaction successful at price: ${realTimePrice}`);
        } catch (error) {
          console.error('Error short selling crypto', error);
          alert('Error short selling crypto');
        }
      }
    };

    return (
      <div className="amk">
        <Header />
        {/* <div className="empty-area">
          <div className="about-crypto">
            about
          </div>
          <div className="list-crypto">
            list
          </div>
        </div> */}

        <div className="trading-area">
          <div className="crypto-details">
          <div className="list-name">
                <p>Cryptocurrencies</p>
              </div>
            <div className="crypto">
              <table className="rwd-table1">
                <thead>
                  <tr className="table-header">
                    <th className="name-column">Name</th>
                    <th>1h%</th>
                    <th>24h%</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptos.map((crypto, index) => (
                    <tr key={crypto.id}>
                      <td data-th="Name" className="name-column">{crypto.name}</td>
                      <td data-th="% Change 1h" style={{color: crypto.quote.USD.percent_change_1h >= 0 ? 'rgb(91,193,137)' : 'red'}}>
                        <div className="list-crypto-flex">
                        <Image src={crypto.quote.USD.percent_change_1h >= 0 ? "/up.png" : "/down.png"} alt="Change" width={15} height={15} />
                          {crypto.quote.USD.percent_change_1h.toFixed(2)}%
                        </div>
                      </td>
                      <td data-th="% Change 24h" style={{color: crypto.quote.USD.percent_change_24h >= 0 ? 'rgb(91,193,137)' : 'red'}}>
                        <div className="list-crypto-flex">
                          <Image src={crypto.quote.USD.percent_change_24h >= 0 ? "/up.png" : "/down.png"} alt="Change" width={15} height={15}/>
                          {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>                
          </div>
          </div>
          <div className="chart-name">
                <p>Chart</p>
                <p>About</p>
                <p>Trending</p>
              </div>
          <div className="chart-scrollable-container">
            <div className="chart-layout">
              <div className="chart-container" id="chart-container">

                  {ohlc ? (
                    <div ref={chartContainerRef} className="chart" id="chart"> </div>
                  ) : (
                    <div>Loading chart...</div>
                  )}
                </div>
            </div>
            {/* <div className="about-layout">
              <p>About bitcoin</p>
            </div>
            <div className="most-visited-crypto-layout">
              <p>Most visited crypto layout</p>
            </div>
            <div className="global-prices-layout">
              <p>Global Prices</p>
            </div>
            <div className="trending-layout">
              <p>Trending</p>
            </div> */}

          </div>

          <div className="chart">
          </div>
          {/* <Image src="/bull1.png" alt="cryptoImage" width={850} height={800} className="logoooo"></Image> */}
          <Image src="/images/iconBull.png" alt="Logo" width={550} height={542} className="logoooo" />
          <div className="crypto-details">
              {cryptoDetails && (
                <div>
                  <div className="right">
                          <div className="right-box">
                            <div className="crypto_name">
                              <Image src={cryptoDetails.image.small} alt="cryptoImage" width={30} height={30}></Image>
                              <p className="crypto-name">{cryptoDetails.name}</p>
                              <p className="crypto-symbol">${cryptoSymbol}</p>
                              <div className="crypto-socials">
                                {/* <p>{cryptoDetails.homepage[0]}</p> */}
                              </div>
                            </div>
                            <div className="real-time">
                              <p style={{ color: getPriceColor() }}>
                                ${realTimePrice !== null ? realTimePrice : 'Loading...'}
                              </p>
                              <p style={{ color: 'black', fontSize: '15px' }}>
                                Balance: ${portfolio.portfolio.balance !== null ? portfolio.portfolio.balance : 'Loading...'}
                              </p>
                            </div>
                            <div className="crypto-stats">
                              <div className="wrapper-details">
                                <div className="header-element">
                                  <div id="buy" onClick={changeColorBuy}>Buy</div>
                                  <div id="sell" onClick={changeColorSell}>Sell</div>
                                </div>
                                <div className="details">
                                  <div className="details-label">
                                    <label htmlFor="buyhey" className="input-label">Quantity</label>
                                    <div className="realtime-label">
                                      <label htmlFor="realtime" className="input-label">Price Per Coin</label>
                                      <p>$</p>
                                    </div>
                                  </div>
                                  <div className="detail-input">
                                    <input
                                      type="number"
                                      id='buyhey'
                                      value={buyAmount}
                                      onChange={(e) => setBuyAmount(parseFloat(e.target.value))}
                                      placeholder="0.00"
                                      className="input-field buybtn"
                                    />
                                    <input
                                      type="number"
                                      id='buyhey'
                                      value={shortSellAmount}
                                      onChange={(e) => setShortSellAmount(parseFloat(e.target.value))}
                                      placeholder="0.00 short"
                                      className="input-field shortbtn"
                                    />
                                    <input
                                      type="number"
                                      placeholder={realTimePrice !== undefined ? realTimePrice.toString() : "0"}
                                      className="input-field"
                                      readOnly
                                    />
                                  </div>
                                  <div className="details-label"  id="tk">
                                    <label htmlFor="buyhey" className="input-label">Stop Loss</label>
                                    <label htmlFor="realtime" className="input-label">Take Profit</label>
                                  </div>
                                  <div className="detail-input">
                                    <input
                                      type="number"
                                      id="stopLoss"
                                      value={stopLoss || ''}
                                      onChange={(e) => setStopLoss(e.target.value)}
                                      placeholder="Enter stop loss"
                                      className="input-field"
                                    />
                                    <input
                                      type="number"
                                      id="takeProfit"
                                      value={takeProfit || ''}
                                      onChange={(e) => setTakeProfit(e.target.value)}
                                      placeholder="Enter take profit"
                                      className="input-field"
                                    />
                                  </div>
                                  <div className="total-spent">
                                    <p className="total-label">Total Spent</p>
                                    <p className="total-label">${buyAmount * realTimePrice}</p>
                                  </div>
                                </div>
                                <div className="detail-input">
                                  <div>
                                    <button onClick={handleBuyClick} className="buy-button">Buy</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                        <div className="sticky">
                        <div className="crypto-stats-details">
                          <div className="volume-info">
                            <p>Market Cap: </p>
                            <Image src={information} width={20} height={20}></Image>
                          </div>

                          <div className="crypto-stats-details">
                        </div>
                          {cryptoDetails.market_data.market_cap_change_percentage_24h >= 0 ? (
                            <p>
                              <div className="stat">
                                <div className="stat-flex">
                                  <Image src="/up.png" height={15} width={15} className="trend"></Image>
                                  <p style={{ color: '#16c784' }}><b>{cryptoDetails.market_data.market_cap_change_percentage_24h.toFixed(2)}%</b></p>
                                </div>
                                <b>${cryptoDetails.market_data.market_cap.usd.toLocaleString()}</b>


                              </div>
                            </p>
                          ) : (
                            <p>
                              <div className="stat">
                                <div className="stat-flex">
                                <Image src="/down.png" height={15} width={15}></Image> <p style={{ color: '#ea3943' }}><b>{cryptoDetails.market_data.market_cap_change_percentage_24h.toFixed(2)}%</b></p> <b>${cryptoDetails.market_data.market_cap.usd.toLocaleString()}</b>
                                </div>

                              </div>
                            </p>
                          )}
                        </div>
                        <hr className='hey'/>
                        <div className="crypto-stats-details">
                          <div className="volume-info">
                            <p>Volume (24h): </p>
                            <Image src={information} width={20} height={20}></Image>
                          </div>
                          {cryptoDetails.market_data.price_change_percentage_24h >= 0 ? (
                            <p>
                              <div className="stat">
                                <div className="stat-flex">
                                  <Image src="/up.png" height={15} width={15} className="trend"></Image>
                                  <p style={{ color: '#16c784' }}><b>{cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%</b></p>
                                </div>
                                <b>${cryptoDetails.market_data.total_volume.usd.toLocaleString()}</b>
                              </div>
                            </p>
                          ) : (
                            <p>
                              <div className="stat">
                                <div className="stat-flex">
                                  <Image src="/down.png" height={15} width={15}></Image>
                                  <p style={{ color: '#ea3943' }}><b>{cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%</b></p>
                                  <b>${cryptoDetails.market_data.total_volume.usd.toLocaleString()}</b>
                                </div>
                              </div>
                            </p>
                          )}
                        </div>
                        <hr className='hey'/>
                        <div className="crypto-stats-details">
                          <p>Circulating Supply: </p>
                          <p><b>{cryptoDetails.market_data.circulating_supply} {cryptoSymbol}</b></p>
                        </div>
                        <div className="progress-thing">
                          <div className="progress-bar">
                            <div className="progress" style={{ width: `${supplyPercentage}%` }}></div>
                          </div>
                          <p style={{ marginRight: 20 }}>{supplyPercentage}%</p>
                        </div>

                        <hr className='hey'/>

                        <div className="crypto-stats-details">
                          <p>Total Supply: </p>
                          <p><b>{cryptoDetails.market_data.total_supply} {cryptoSymbol}</b></p>
                        </div>
                        <hr className='hey'/>

                        {cryptoDetails.market_data.price_change_24h >= 0 ? (
                          <div className="crypto-stats-details">
                            <p>Change 24h:</p>
                            <div className="stat">
                              <div className="stat-flex">
                                <Image src="/up.png" height={15} width={15} className="trend"></Image>
                                <p style={{ color: '#16c784' }}>
                                  <b>{cryptoDetails.market_data.price_change_24h.toFixed(2)}%</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="crypto-stats-details">
                            <p>Change 7d:</p>
                            <div className="stat">
                              <div className="stat-flex">
                                <Image src="/down.png" height={15} width={15}></Image>
                                <p style={{ color: '#ea3943' }}>
                                  <b>{cryptoDetails.market_data.price_change_24h.toFixed(2)}%</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <hr className='hey'/>

                        {cryptoDetails.market_data.price_change_percentage_7d >= 0 ? (
                          <div className="crypto-stats-details">
                            <p>Change 7d:</p>
                            <div className="stat">
                              <div className="stat-flex">
                                <Image src="/up.png" height={15} width={15} className="trend"></Image>
                                <p style={{ color: '#16c784' }}>
                                  <b>{cryptoDetails.market_data.price_change_percentage_7d.toFixed(2)}%</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="crypto-stats-details">
                            <p>Change 7d:</p>
                            <div className="stat">
                              <div className="stat-flex">
                                <Image src="/down.png" height={15} width={15}></Image>
                                <p style={{ color: '#ea3943' }}>
                                  <b>{cryptoDetails.market_data.price_change_percentage_7d.toFixed(2)}%</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <hr className='hey'/>
                        <div className="crypto-stats-details">
                          <p>Fully Diluted Valuation:</p>
                          <p><b>${cryptoDetails.market_data.fully_diluted_valuation.usd.toLocaleString()}</b></p>
                        </div>
                    </div>
                  </div>
              )}
          </div>
        </div>
        <Footer/>
      </div>
    );
    
}

export default Details;
