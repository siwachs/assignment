export default function Forecast({
  forecast,
}: Readonly<{
  forecast: {
    dt: number;
    main: { temp: number };
    weather: { description: string }[];
  }[];
}>) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-center mb-4 text-white">
        5-Day Forecast
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded shadow text-center"
          >
            <p className="text-gray-300">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </p>

            <p className="text-xl font-bold text-white">{day.main.temp}°C</p>

            <p className="capitalize text-gray-400">
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
