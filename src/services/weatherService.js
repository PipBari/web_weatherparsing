import { from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import axios from 'axios';

const API_KEY = '81592fd082211aafdeee651e9fc04176';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = (city) => {
  return from(axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`)).pipe(
    map(response => response.data),
    catchError(error => throwError(() => new Error(error.response?.data?.message || "An unexpected error occurred")))
  );
};
