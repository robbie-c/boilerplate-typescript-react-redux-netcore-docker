import { RequestStatus } from '../../constants/index';

export interface WeatherForecastsState {
    requestStatus: RequestStatus;
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

export interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}