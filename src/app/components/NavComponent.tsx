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
import filledStar from '../assets/WstartFull.png'
const apikey = process.env.NEXT_PUBLIC_API_KEY;
// import { getlocalStorage, saveToLocalStorage, removeFromLocalStorage } from '@/utils/utils';
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
  const [weatherName, setWeatherName] = useState('')
  const [starFilled, setStarFilled] = useState(false);
  const [getLocalStorageDataData, setGetLocalStorage] = useState<string[]>([]);
  const handleStarClick = () => {
    setStarFilled(!starFilled);
  };

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
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageData = localStorage.getItem('Favorites');
      if (localStorageData) {
        setGetLocalStorage(JSON.parse(localStorageData));
      }
    }
  }, []);

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
    setWeatherName(data.weather[0].main)
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
    console.log(weatherName);
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
    setWeatherIconID(data.weather[0].id)
    setWeatherName(data.weather[0].main)
  };

  const searchApi3 = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${searchLat}&lon=${searchLon}&appid=${apikey}&units=imperial`);
    const data = await response.json();
    const convertdata = data.main.temp
    setCurrentF(`${Math.floor(convertdata)}°`)
    console.log(data)
    setWeatherIconID(data.weather[0].id)
    setWeatherName(data.weather[0].main)
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

  const getWeatherIcon = (weatherID: number) => {
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
      return sun.src; // Default to a sun icon if no matching conditions found
    }
  };




 const saveToLocalStorage = (mon: string) => {
  let favorites = getLocalStorageDataData;
  if (!favorites?.includes(mon)) {
    favorites?.push(mon);
  }
  localStorage.setItem('Favorites', JSON.stringify(favorites));
};

 const removeFromLocalStorage = (weatherName: string) => {
  let favorites: string[] | null | undefined = getLocalStorageDataData;
  favorites = favorites?.filter((favorite) => favorite !== weatherName);
  localStorage.setItem('Favorites', JSON.stringify(favorites));
};

  return (
    <>
      <div className='bgNav px-5 py-2 grid grid-cols-2'>
        <div className='lg:col-span-1 col-span-2 grid grid-cols-10'>
          <div className='lg:hidden block col-span-3'></div>
          <div className='lg:col-span-1 col-span-4 flex justify-center'>
            <img src={logo.src} alt='Logo' width='77px' height='75px'></img>
          </div>
          <div className='lg:hidden block col-span-3'></div>
          <div className='lg:col-span-9 col-span-10'>
            <p className='fifty fwnav lg:text-start text-center'>
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
              className='border-0 rounded-3xl inputClass ps-12'
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
          {getLocalStorageDataData?.map((favorite, index) => (
            <div className='grid grid-cols-12 favClass py-2' key={index}>
              <div className='lg:col-span-10 col-span-6'>
                <p className="text-end fwnav" onClick={() => handleFavoriteClick(favorite)}>
                  {favorite}
                </p>
              </div>
              <div className='lg:col-span-2 col-span-6 xClass'>
                <p className="text-center" onClick={() => removeFromLocalStorage(favorite)}>
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
          <div onClick={() => {saveToLocalStorage(locName); handleStarClick()}} className='lg:col-span-1 col-span-12 py-8 pe-5 flex lg:justify-end justify-center'>
            <img src={starFilled ? filledStar.src : star.src} alt='Star' width='60px' height='58px' />
          </div>
        </div>

        <p className='thirtf lg:block hidden'>
          <span className='fwnav'>Current weather</span> | <span>{weatherName}</span>
        </p>
        <p className='thirtf lg:hidden block text-center'>
          <span className='fwnav'>Current weather</span> <hr /> <span>{weatherName}</span>
        </p>

        <div className='grid grid-cols-12 pb-2'>
          <div className='lg:col-span-1 col-span-12 py-7 lg:pb-0'>
            <img src={getWeatherIcon(weatherIconID)} alt='Sun' width='100%' />
          </div>
          <div className='bigtxt lg:col-span-11 col-span-12 lg:ps-4 lg:text-start text-center'>
            <span className='lg:block hidden pt-7'>{currentF}F | {currentC}C</span>
            <span className='lg:hidden block'>{currentF}F <hr /> {currentC}C</span>
          </div>
        </div>
      </div>

      <div className='px-5 pb-20 lg:pt-0 pt-10'>
        <p className='thirtf pb-3 lg:text-start text-center fwnav'>
          Five Day Forecast
        </p>
        {forecastData && forecastData.length > 0 ? (
          <div className='grid grid-cols-5 twenty text-center gap-8'>
            {forecastData.slice(0, 5).map((day, index) => (
              <div className='lg:col-span-1 col-span-5 fivebg' key={index}>
                <p className='py-3 thirtf black'>{GetWeekDays()[index]}</p>
                <div className='flex justify-center pb-5'>
                  <img src={getWeatherIcon(day.weather[0].id)} width='45%' alt='Weather Icon' />
                </div>
                <p className='twenty pb-2'>{day.weather[0]?.main}</p>
                <p className='fifty black'>{Math.floor(day.main.temp_max)}° F</p>
                <p className='fifty gray'>{Math.floor(day.main.temp_min)}° F</p>
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
