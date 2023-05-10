import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Header from "./components/Header";

const getCityData = async (cityName) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=189271b827844bff7388350c44848615&units=metric`
    );
    return data;
  } catch (error) {
    console.log(error.message, "Error in api");
  }
};

function App() {
  const [cityName, setCityName] = useState("Tehran");

  const { data, isError, isLoading } = useQuery(["weather", cityName], () =>
    getCityData(cityName)
  );

  return (
    <>
      <Header setCity={setCityName} />
      <section className="max-w-5xl mx-auto container mt-20 flex items-center justify-center flex-col">
        {isLoading ? (
          <div className="text-center text-xl font-semibold">Loading...</div>
        ) : (
          <>
            <h1 className="text-center text-5xl font-semibold text-[#252525]">
              {data?.name}
            </h1>
            <div className="flex items-center my-3">
              <img
                src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt={data?.name}
              />
              <h3 className="text-3xl font-semibold text-[#252525]">
                {data?.weather[0].main}
              </h3>
            </div>
            <div className="my-2 text-4xl font-semibold text-[#252525]">
              {data?.main.temp.toFixed()} °C
            </div>
            <div className="flex items-center justify-between w-[90%] lg:flex-row flex-col lg:w-[70%] mx-auto mt-8 gap-y-3">
              <div className="flex items-center gap-y-1 flex-col text-xl px-4 py-6 bg-slate-900 rounded-md lg:w-[32%] w-[50%] text-white">
                <p>Humidity</p>
                <h1>{data?.main.humidity.toFixed()}%</h1>
              </div>
              <div className="flex items-center gap-y-1 flex-col text-xl px-4 py-6 bg-slate-900 rounded-md lg:w-[32%] w-[50%] text-white">
                <p>Wind</p>
                <h1>{data?.wind.speed.toFixed()} km/h</h1>
              </div>
              <div className="flex items-center gap-y-1 flex-col text-xl px-4 py-6 bg-slate-900 rounded-md lg:w-[32%] w-[50%] text-white">
                <p>Feels Like</p>
                <h1>{data?.main.feels_like.toFixed()} °C</h1>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default App;
