/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import SearchBar from "@/components/search";
import WeatherCard from "@/components/weatherCard";
import Forecast from "@/components/forcast";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast([]);

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
        { next: { revalidate: 3600 } }
      );

      const weatherData = await weatherRes.json();
      if (weatherData.cod !== 200) throw new Error(weatherData.message);

      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      const forecastData = await forecastRes.json();

      setForecast(
        forecastData.list.filter((reading: any) =>
          reading.dt_txt.includes("12:00:00")
        )
      );
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
        <h1 className="text-4xl select-none font-bold mb-6">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={fetchWeather} />

        {loading && (
          <div className="mt-6 animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weather?.main && <WeatherCard weather={weather} />}
        {forecast.length > 0 && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
}
