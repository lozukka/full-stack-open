import axios from "axios";
const baseURL = "https://api.open-meteo.com/v1/forecast";

const getWeather = (latitude, longitude) => {
  return axios.get(baseURL, {
    params: {
      latitude,
      longitude,
      current: "temperature_2m,wind_speed_10m",
      wind_speed_unit: "ms",
    },
  });
};

export default { getWeather };
