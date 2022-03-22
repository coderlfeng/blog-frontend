import axios from "axios";
import service from "../index";

const getCity = () => {
  return axios.get(
    process.env.NODE_ENV === "development"
      ? `/weather/api/weather/city/101270101`
      : "http://t.weather.itboy.net/api/weather/city/101270101"
  );
};

const getCit = () => {
  return axios.get(`/city/ipquery`);
};

export { getCity, getCit };
