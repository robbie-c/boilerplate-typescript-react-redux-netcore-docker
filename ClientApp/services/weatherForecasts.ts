import { fetch } from 'domain-task';
import { WeatherForecast } from '../store/types/weatherForecasts';

export async function fetchWeatherForecasts(startDateIndex: Number) {
    const response = await fetch(`/api/SampleData/WeatherForecasts?startDateIndex=${ startDateIndex }`);
    return response.json() as WeatherForecast[];
}
