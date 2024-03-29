"use client";

import React, { useEffect, useState } from 'react';
import sun from '../assets/WhiteSun.png';
import star from '../assets/Wstart.png';
const apikey = process.env.NEXT_PUBLIC_API_KEY;

const CurrentComponent = (props: { searchLat: string; searchLon: string, weatherData: string }) => {
    const [locName, setLocName] = useState('')
    const [currentF, setCurrentF] = useState('')
    const [currentC, setCurrentC] = useState('')

    const { searchLat, searchLon } = props;

    useEffect(() => {
        const fetchData = () => {
            navigator.geolocation.getCurrentPosition(success, errorFunc);
        };

        fetchData();
    }, []);

    const success = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        weatherApiF(latitude, longitude);
        weatherApiC(latitude, longitude);
    };

    const errorFunc = (error: GeolocationPositionError) => {
        console.log(error.message);
    };

    const weatherApiC = async (latitude: number, longitude: number) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`);
            const data = await response.json();
            console.log(data);
            setLocName(data.name)
            setCurrentC(`${Math.floor(data.main.temp)}°`)
    };

    const weatherApiF = async (latitude: number, longitude: number) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`);
            const data = await response.json();
            console.log(data);
            setLocName(data.name)
            setCurrentF(`${Math.floor(data.main.temp)}°`)
    };

    const searchApiF = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${searchLat}&lon=${searchLon}&appid=${apikey}&units=imperial`);
            const data = await response.json();
            console.log(data);
            setLocName(data.name)
            setCurrentF(`${Math.floor(data.main.temp)}°`)

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className='px-5'>
            <div className='grid grid-cols-12'>
                <div className='col-span-5'>
                    <p className='locnametxt py-4'>
                        {locName}
                    </p>
                </div>
                <div className='col-auto py-8 ps-10'>
                    <img src={star.src} alt='Star' width='60px' height='50px' />
                </div>
            </div>
            <p className='thirtf'>
                Current weather | time and date goes here
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
    );
};

export default CurrentComponent;