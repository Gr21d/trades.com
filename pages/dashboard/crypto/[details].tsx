"use client"

import axios from 'axios';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {createChart, UTCTimestamp, ColorType, IChartApi, ISeriesApi, Time, WhitespaceData, LineData, LineSeriesOptions, LineStyleOptions, DeepPartial, SeriesOptionsCommon, CandlestickData, CandlestickSeriesOptions, CandlestickStyleOptions} from 'lightweight-charts'


type CustomTimeType = UTCTimestamp;



function Details(props) {
    const [cryptoDetails, setCryptoDetails] = useState(null);
    const [ohlc, setOhlc] = useState(null);

    const [chart, setChart] = useState<IChartApi | null>(null);
    const [candlestickSeries, setCandlestickSeries] = useState<ISeriesApi<"Candlestick", Time, WhitespaceData<Time> | CandlestickData<Time>, CandlestickSeriesOptions, DeepPartial<CandlestickStyleOptions & SeriesOptionsCommon>> | null>(null);
    const [error, setError] = useState(null);
    const [realTimePrice, setRealTimePrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 
    const [cryptoSymbol, setCryptoSymbol] = useState(null);
    const pathname = usePathname();
    const chartContainerRef = useRef(null)
    
    let cryptoName = pathname ? pathname.substring(1) : null; 

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
          console.log(data);
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
      if (chartContainerRef.current && ohlc && cryptoSymbol) {
        let newChart: IChartApi | null = null;
    
        if (!chart) {
          newChart = createChart(chartContainerRef.current, {
            layout: {
              background: { type: ColorType.Solid, color: 'white' },
              textColor: 'black',
            },
            width: 1500,
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
        
        // if (newChart) {
        //   newChart.timeScale().setVisibleRange({ from, to });
        // }
        
        // newChart?.subscribeVisibleTimeRangeChange(({ from, to }) => {
        //   // Update the time range information
        //   const dateFrom = new Date(from * 1000);
        //   const dateTo = new Date(to * 1000);
        //   const timeRangeString = `${dateFrom.toLocaleDateString()} - ${dateTo.toLocaleDateString()}`;
        //   // Display the time range information somewhere on your page
        // });
        
        // chart.subscribeVisibleTimeRangeChange(({ from, to }) => {
        //   // Update the time range information
        //   const dateFrom = new Date(from * 1000);
        //   const dateTo = new Date(to * 1000);
        //   const timeRangeString = `${dateFrom.toLocaleDateString()} - ${dateTo.toLocaleDateString()}`;
        //   // Display the time range information somewhere on your page
        // });
    
        let lineData = data.map(item => ({ time: item.time, value: (item.open + item.close) / 2 }));
    
        console.log('line', lineData);
    
        console.log('loaded')
        lineSeries.setData(lineData);
        newCandlestickSeries.setData(data);
        setCandlestickSeries(newCandlestickSeries);
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
          if (newCandlestickSeries) {
            console.log('Updating candlestick series');
            newCandlestickSeries.update({
              time: (candle.t / 1000) as CustomTimeType,
              open: parseFloat(candle.o),
              high: parseFloat(candle.h),
              low: parseFloat(candle.l),
              close: parseFloat(candle.c),
            });
          }

          setRealTimePrice(parseFloat(candle.c));
        });
    
        return () => {
          socket.close();
        };
        
      }
    }, [chartContainerRef.current, ohlc, cryptoSymbol, chart]);
    
    // chart
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>Details</h1>

    {cryptoDetails && (
      <div>
        {cryptoDetails.name} <br />
        {cryptoDetails.symbol} <br />
        {cryptoDetails.currentPrice} <br />
        Real-time price: {realTimePrice !== null ? realTimePrice : 'Loading...'}
      </div>
    )}

                          <div>
        {ohlc ? (
          <div ref={chartContainerRef}></div>
        ) : (
          <div>Loading chart...</div>
        )}
      </div>
        
      </div>
    );
}

export default Details;
