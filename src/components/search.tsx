import { useState, FormEvent, ChangeEvent } from "react";

export default function SearchBar({
  onSearch,
}: Readonly<{
  onSearch: (city: string) => void;
}>) {
  const [city, setCity] = useState("");

  function search(e: FormEvent) {
    e.preventDefault();

    if (city.trim()) onSearch(city.trim());
  }

  function changeCityInput(e: ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  return (
    <form onSubmit={search} className="flex space-x-2 mb-6">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={changeCityInput}
        className="p-2 rounded bg-gray-800 text-white border border-gray-600 outline-none"
      />

      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
