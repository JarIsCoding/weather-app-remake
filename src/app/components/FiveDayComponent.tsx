"use client";

import React, { useEffect, useState } from 'react'
import sun from '../assets/WhiteSun.png'
const apikey = process.env.NEXT_PUBLIC_API_KEY;

const FiveDayComponent = () => {

    const [forecastData, setForecastData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = () => {
            navigator.geolocation.getCurrentPosition(success, errorFunc);
        };

        fetchData();
    }, []);

    const success = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fiveDayApi(latitude, longitude);
    };

    const errorFunc = (error: GeolocationPositionError) => {
        console.log(error.message);
    };

    const fiveDayApi = async (latitude: number, longitude: number) => {
        //The days are [0], [2], [9], [17], [25]
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`);
            const data = await response.json();
            console.log(data);
            setForecastData(data.list)
    };

    const getDayOfWeek = (index: number): string => {
        // using the built in function new date we can caculate the day that we are on with modulo
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const currentDate = new Date();
        const dayOfWeek = (currentDate.getDay() + index) % 7;        
        console.log(days[dayOfWeek]);
        return days[dayOfWeek];
    };

    const fiveDays = [0, 2, 9, 17, 25];


    return (
        <div className='px-5 pb-20'>
            <p className='thirtf pb-3'>
                Five Day Forecast
            </p>
            <div className='grid grid-cols-5 twenty text-center gap-8'>
                {/* Map through data.list and create a card for each item which is set to 5*/}
                {fiveDays.map((e: number) => (
                    <div className='col-span-1 fivebg' key={e}>
                        <p className='py-3 thirtf black'>
                            {getDayOfWeek(e)}
                        </p>
                        <div className='flex justify-center pb-5'>
                            <img src={sun.src} width='45%'></img>
                        </div>
                        <p className='twenty pb-2'>
                            {forecastData[e]?.weather[0]?.main}
                        </p>
                        <p className='fifty black'>
                            {Math.floor(forecastData[e]?.main.temp_max)}° F
                        </p>
                        <p className='fifty gray'>
                            {Math.floor(forecastData[e]?.main.temp_min)}° F
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FiveDayComponent
