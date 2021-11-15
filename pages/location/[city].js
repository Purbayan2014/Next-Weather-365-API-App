import React from "react";
import cities from "../../lib/city.list.json";
import Head from 'next/head';
import TodaysWeather from "../../components/TodaysWeather";
import moment from "moment-timezone";
import HourlyWeather from "../../components/HourlyWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import SearchBox from "../../components/SearchBox"
import Link from "next/link";

export async function getServerSideProps(context) {
    const  city = getCity(context.params.city);

    if(!city) {
        return {
            notFound: true,
        };
    }

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
    );


    const data = await res.json();


    if(!data){
        return {
            notFound: true,
        };
    }

   const hourlyWeather = getHourlyWeather(data.hourly,data.timezone);

   const weeklyWeather = data.daily;
    
   
    return {
        props: {
           city: city,
           timezone : data.timezone,
           currentWeather: data.current,
           dailyWeather: data.daily,
           hourlyWeather: hourlyWeather,
           weeklyWeather: weeklyWeather,
        },
    };
}

const getCity = param => {
    const cityParam = param.trim();
    //get the id of the city
    const splitCity = cityParam.split("-");
    console.log(splitCity);
    const id = splitCity[splitCity.length - 1];
    

    if(!id) {
        return null;
    }
  
  const city = cities.find(city => city.id.toString() == id);

  if(city) {
      return city;
  } else{
      return null;
  }
};

const getHourlyWeather = (hourlyData,timezone) =>  {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const eodTimeStamp = Math.floor(endOfDay / 1000); 

    const todaysData = hourlyData.filter(data => data.dt < eodTimeStamp);

    return todaysData;

};

export default function City({ 
    hourlyWeather,
    dailyWeather,
    currentWeather,
    weeklyWeather,
    timezone,
    city 
     }) {
    console.log(dailyWeather);
    return (
        <div>
            <Head>
               <title>{city.name} Weather - Next Weather 365 App</title> 
            </Head>

            <div className="page-wrapper">
                <div className="container">
                <Link href="/">
                <a className="back-link">&larr; Home</a>
                </Link>
                <SearchBox placeholder="Search for another location..." />
                  <TodaysWeather city={city} 
                  weather={dailyWeather[0]} 
                  timezone={timezone}
                  />
                  <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
                  <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
                </div>
            </div>
        </div>
    );
}
