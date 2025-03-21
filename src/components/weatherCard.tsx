export default function WeatherCard({
  weather,
}: Readonly<{
  weather: {
    name: string;
    sys: { country: string };
    main: { temp: number; humidity: number };
    weather: { description: string }[];
    wind: { speed: number };
  };
}>) {
  return (
    <div className="bg-gray-900 p-6 rounded shadow-md max-w-md text-center">
      <h2 className="text-2xl font-bold text-white">
        {weather.name}, {weather.sys.country}
      </h2>

      <p className="text-xl text-white">{weather.main.temp}°C</p>

      <p className="capitalize text-gray-400">
        {weather.weather[0].description}
      </p>

      <p className="text-gray-400">Humidity: {weather.main.humidity}%</p>

      <p className="text-gray-400">Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}
