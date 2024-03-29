"use client";

import React, { useEffect, useState } from 'react'
import logo from '../assets/WeatherLogo.png'
import star from '../assets/Wstart.png'
import sun from '../assets/WhiteSun.png';
const apikey = process.env.NEXT_PUBLIC_API_KEY;

const NavComponent = () => {

  const [searchLat, setSearchLat] = useState('')
  const [searchLon, setSearchLon] = useState('')
  const [locName, setLocName] = useState('')
  const [currentF, setCurrentF] = useState('')
  const [currentC, setCurrentC] = useState('')
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [divType, setDivType] = useState<string>('off');
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = () => {
      navigator.geolocation.getCurrentPosition(success, errorFunc);
    };

    fetchData();
  }, []);


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

    fetchData();
    if (searchLat && searchLon) {
      searchApi2()
      searchApi3()
      searchApi4()
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

  const saveToLocalStorage = (mon: string) => {
    let favorites = getlocalStorage();
    if (!favorites.includes(mon)) {
      favorites.push(mon);
    }
    localStorage.setItem('Favorites', JSON.stringify(favorites));
  };

  const getlocalStorage = (): string[] => {
    let localStorageData = localStorage.getItem('Favorites');

    if (localStorageData === null) {
      return [];
    }
    return JSON.parse(localStorageData);
  };

  const removeFromLocalStorage = (weatherName: string) => {
    let favorites = getlocalStorage();
    favorites = favorites.filter((favorite) => favorite !== weatherName);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
  };

  const handleOpenDiv = () => {
    if (divType === 'off') {
      setDivType('on');
    } else {
      setDivType('off');
    }
  }



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
            <p className='fifty fwnav'>
              What{"'"}s the Weather?
            </p>
          </div>
        </div>

        <div className='lg:col-span-1 col-span-2 grid grid-cols-2 pt-3'>
          <div className='col-span-1 pt-1'>
            <div className='grid lg:grid-cols-8 grid-col-1'>

              <div className='lg:col-span-4'></div>

              <div className='lg:col-span-3 col-span-1'>
                <p onClick={handleOpenDiv} className='tf lg:text-end text-start'>
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
        <div className={`col-span-1 ${divType === 'off' ? 'hidden' : ''}`}>
          {getlocalStorage().map((favorite, e) => (
            <div className='grid grid-cols-12 favClass'>
              <div className='col-span-10'>
                <p key={e} className="text-end" onClick={() => handleFavoriteClick(favorite)}>
                  {(favorite)}
                </p>
              </div>
              <div className='col-span-2'>
                <p className="px-10" onClick={() => removeFromLocalStorage(favorite)}>
                  X
                </p>
              </div>
            </ div>
          ))}
        </div>
      </div>

      <div className='px-5'>
        <div className='grid grid-cols-12 namebg'>
          <div className='col-span-11'>
            <p className='locnametxt py-4'>
              {locName}
            </p>
          </div>
          <div onClick={() => saveToLocalStorage(locName)} className='col-span-1 py-8 pe-5 lg:flex lg:justify-end'>
            <img src={star.src} alt='Star' width='60px' height='58px' />
          </div>
        </div>

        <p className='thirtf'>
          <span>Current weather</span> | <span>time and date goes here</span>
        </p>

        <div className='grid grid-cols-12 py-2'>
          <div className='col-span-1'>
            <img src={sun.src} alt='Sun' width='100%' />
          </div>
          <div className='bigtxt col-span-11 ps-4'>
            {currentF}F | {currentC}C
          </div>
        </div>
      </div>

      <div className='px-5 pb-20'>
        <p className='thirtf pb-3'>
          Five Day Forecast
        </p>
        {forecastData && forecastData.length > 0 ? (
          <div className='grid grid-cols-5 twenty text-center gap-8'>
            {fiveDaysOfWeek.map((dayOfWeek: string, index: number) => (
              <div className='col-span-1 fivebg' key={index}>
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
