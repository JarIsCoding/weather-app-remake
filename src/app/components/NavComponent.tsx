"use client";

import React, { useEffect, useState } from 'react'
import logo from '../assets/WeatherLogo.png'
import star from '../assets/Wstart.png'
import sun from '../assets/WhiteSun.png';
import cloud from '../assets/Cloudy.png'
import hazy from '../assets/Hazy.png'
import rainy from '../assets/Rainy.png'
import snow from '../assets/Snowy.png'
import storm from '../assets/Stormy.png'
const apikey = process.env.NEXT_PUBLIC_API_KEY;
import { getlocalStorage, saveToLocalStorage, removeFromLocalStorage } from '@/utils/utils';
const NavComponent = () => {

  const [searchLat, setSearchLat] = useState('')
  const [searchLon, setSearchLon] = useState('')
  const [locName, setLocName] = useState('')
  const [currentF, setCurrentF] = useState('')
  const [currentC, setCurrentC] = useState('')
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [divType, setDivType] = useState<string>('off');
  const [search, setSearch] = useState('')
  const [weatherIconID, setWeatherIconID] = useState<any>('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [localTest, setLocalTest] = useState('')
  const fiveDayApi = async (latitude: number, longitude: number) => {
    //The days are [0], [2], [9], [17], [25]
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`);
    const data = await response.json();
    console.log(data);
    setForecastData(data.list)
  };

  const date: Date = new Date();
  const day = date.getDay();

  const GetWeekDays = (): string[] => {
    switch (day) {
      case 0:
        return ["Sun", "Mon", "Tue", "Wed", "Thu"];
        break;
      case 1:
        return ["Mon", "Tue", "Wed", "Thu", "Fri"];
        break;
      case 2:
        return ["Tue", "Wed", "Thu", "Fri", "Sat"];
        break;
      case 3:
        return ["Wed", "Thu", "Fri", "Sat", "Sun"];
        break;
      case 4:
        return ["Thu", "Fri", "Sat", "Sun", "Mon"];
        break;
      case 5:
        return ["Fri", "Sat", "Sun", "Mon", "Tue"];
        break;
      case 6:
        return ["Sat", "Sun", "Mon", "Tue", "Wed"];
        break;
      default:
        return ["Mon", "Tue", "Wed", "Thu", "Fri"];
    }
  };

  const fiveDaysOfWeek = GetWeekDays().slice(0, 5);

  useEffect(() => {
    const fetchData = () => {
      navigator.geolocation.getCurrentPosition(success, errorFunc);
    };
    if (searchLat && searchLon) {
      searchApi2()
      searchApi3()
      searchApi4()
    } else {
      fetchData();
    }
  }, [searchLat, searchLon]);

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    weatherApi(latitude, longitude);
    fiveDayApi(latitude, longitude)
  };

  const errorFunc = (error: GeolocationPositionError) => {
    console.log(error.message);
  };

  const weatherApi = async (latitude: number, longitude: number) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`);
    const data = await response.json();
    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`);
    const data2 = await response2.json();
    console.log(data);
    setLocName(data.name)
    setCurrentC(`${Math.floor(data.main.temp)}°`)
    setCurrentF(`${Math.floor(data2.main.temp)}°`)
    setWeatherIconID(data.weather[0].id)
  };

  const searchApi = async () => {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apikey}`);
    const data = await response.json();
    setSearchLat(data[0]?.lat)
    setSearchLon(data[0]?.lon)
    console.log(data)
  };

  const handleFavoriteClick = async (weatherName: string) => {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${weatherName}&limit=5&appid=${apikey}`);
    const data = await response.json();
    console.log(data[0]?.lat);
    const favLat = data[0].lat;
    const favLon = data[0].lon;
    setSearchLat(favLat)
    setSearchLon(favLon)
  }

  const searchApi2 = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${searchLat}&lon=${searchLon}&appid=${apikey}&units=metric`);
    const data = await response.json();
    setLocName(data.name);
    const convertdata = data.main.temp
    setCurrentC(`${Math.floor(convertdata)}°`)
    console.log(data)
  };

  const searchApi3 = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${searchLat}&lon=${searchLon}&appid=${apikey}&units=imperial`);
    const data = await response.json();
    const convertdata = data.main.temp
    setCurrentF(`${Math.floor(convertdata)}°`)

    console.log(data)
  };

  const searchApi4 = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${searchLat}&lon=${searchLon}&appid=${apikey}&units=imperial`);
    const data = await response.json();
    setForecastData(data.list)
    console.log(data)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchApi();
    }
  };



  const handleOpenDiv = () => {
    if (divType === 'off') {
      setDivType('on');
    } else {
      setDivType('off');
    }
  }

  const getWeatherImage = (weatherID: number): string => {
    if (weatherID >= 801 && weatherID <= 804) {
      return cloud.src;
    } else if (weatherID === 800) {
      return sun.src;
    } else if (weatherID >= 500 && weatherID <= 504 || weatherID === 511 || (weatherID >= 520 && weatherID <= 531)) {
      return rainy.src;
    } else if (weatherID >= 600 && weatherID <= 622) {
      return snow.src;
    } else if (weatherID >= 200 && weatherID <= 232) {
      return storm.src;
    } else if (weatherID >= 300 && weatherID <= 321) {
      return hazy.src;
    } else {
      return sun.src;
    }
  };

  let test = getlocalStorage() ? getlocalStorage() : null 

  //   if (CWeatherID >= 801 && CWeatherID <= 804) {
  //     CImg.src = "./assets/Cloudy.png"
  //     Day1Img.src = "./assets/Cloudy.png"
  // } else if (CWeatherID === 800) {
  //     CImg.src = "./assets/WhiteSun.png";
  //     Day1Img.src = "./assets/WhiteSun.png";
  // } else if (CWeatherID >= 500 && CWeatherID <= 504 || CWeatherID === 511 || (CWeatherID >= 520 && CWeatherID <= 531)) {
  //     CImg.src = "./assets/Rainy.png";
  //     Day1Img.src = "./assets/Rainy.png";
  // } else if (CWeatherID >= 600 && CWeatherID <= 622) {
  //     CImg.src = "./assets/Snowy.png";
  //     Day1Img.src = "./assets/Snowy.png";
  // } else if (CWeatherID >= 200 && CWeatherID <= 232) {
  //     CImg.src = "./assets/Stormy.png";
  //     Day1Img.src = "./assets/Stormy.png";
  // } else if (CWeatherID >= 300 && CWeatherID <= 321) {
  //     CImg.src = "./assets/Hazy.png";
  //     Day1Img.src = "./assets/Hazy.png";
  // } else {
  //     CImg.src = "./assets/WhiteSun.png";
  //     Day1Img.src = "./assets/WhiteSun.png";
  // }

  return (
    <>
      <div className='bgNav px-5 py-2 grid grid-cols-2'>
        <div className='lg:col-span-1 col-span-2 grid grid-cols-10'>
          <div className='col-span-1'>
            <img src={logo.src} alt='Logo' width='77px' height='75px'></img>
          </div>
          <div className='col-span-9'>
            <p className='fifty fwnav lg:text-start text-end'>
              What{"'"}s the Weather?
            </p>
          </div>
        </div>

        <div className='lg:col-span-1 col-span-2 grid grid-cols-2 pt-3'>
          <div className='col-span-1 pt-1'>
            <div className='grid lg:grid-cols-8 grid-col-1'>

              <div className='lg:col-span-4'></div>

              <div className='lg:col-span-3 col-span-1'>
                <p onClick={handleOpenDiv} className='tf lg:text-end text-center'>
                  Favorites
                </p>
              </div>
              <div onClick={handleOpenDiv} className='col-span-1 ps-4 lg:block hidden'>
                <img src={star.src} width='41px' height='40px' className='pt-1'></img>
              </div>
            </div>
          </div>
          <div className='col-span-1 mb-5 pt-1 ps-6 twenty'>
            <input
              type="text"
              className='border-0 rounded-3xl'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter city name"
            />
          </div>
        </div>
        {/* Favorite Div */}
        <hr className={`col-span-2`} />
        <div className='lg:col-span-1 col-span-2'></div>
        <div className={`lg:col-span-1 col-span-2 ${divType === 'off' ? 'hidden' : ''}`}>
          {test?.map((favorite, index) => (
            <div className='grid grid-cols-12 favClass' key={index}>
              <div className='lg:col-span-10 col-span-6'>
                <p className="text-end" onClick={() => handleFavoriteClick(favorite)}>
                  {favorite}
                </p>
              </div>
              <div className='lg:col-span-2 col-span-6'>
                <p className="px-10" onClick={() => removeFromLocalStorage(favorite)}>
                  X
                </p>
              </ div>
            </div>
          ))}
        </div>
      </div>

      <div className='px-5'>
        <div className='grid grid-cols-12 namebg'>
          <div className='lg:col-span-11 col-span-12'>
            <p className='locnametxt py-4 text-center lg:text-start'>
              {locName}
            </p>
          </div>
          <div onClick={() => saveToLocalStorage(locName)} className='lg:col-span-1 col-span-12 py-8 pe-5 flex lg:justify-end justify-center'>
            <img src={star.src} alt='Star' width='60px' height='58px' />
          </div>
        </div>

        <p className='thirtf'>
          <span>Current weather</span> | <span>time and date goes here</span>
        </p>

        <div className='grid grid-cols-12 pb-2'>
          <div className='lg:col-span-1 col-span-12 py-7 lg:pb-0'>
            <img src={getWeatherImage(weatherIconID)} alt='Sun' width='100%' />
          </div>
          <div className='bigtxt lg:col-span-11 col-span-12 lg:ps-4 lg:text-start text-center'>
          <span className='lg:block hidden pt-7'>{currentF}F | {currentC}C</span>
          <span className='lg:hidden block'>{currentF}F <hr /> {currentC}C</span>
          </div>
        </div>
      </div>

      <div className='px-5 pb-20 lg:pt-0 pt-10'>
        <p className='thirtf pb-3 lg:text-start text-center'>
          Five Day Forecast
        </p>
        {forecastData && forecastData.length > 0 ? (
          <div className='grid grid-cols-5 twenty text-center gap-8'>
            {fiveDaysOfWeek.map((dayOfWeek: string, index: number) => (
              <div className='lg:col-span-1 col-span-5 fivebg' key={index}>
                <p className='py-3 thirtf black'>{GetWeekDays()[index]}</p>
                <div className='flex justify-center pb-5'>
                  <img src={sun.src} width='45%' />
                </div>
                <p className='twenty pb-2'>{forecastData[index]?.weather[0]?.main}</p>
                <p className='fifty black'>{Math.floor(forecastData[index]?.main.temp_max)}° F</p>
                <p className='fifty gray'>{Math.floor(forecastData[index]?.main.temp_min)}° F</p>
              </div>
            ))}
          </div>
        ) : (
          <p className='bigtxt py-44'>No data found</p>
        )}
      </div>
    </>
  )
}

export default NavComponent
