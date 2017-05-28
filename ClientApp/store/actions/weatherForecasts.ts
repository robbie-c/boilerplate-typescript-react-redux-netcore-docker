
import { WeatherForecast } from '../types/weatherForecasts';
import { createAction } from 'redux-actions';
import * as Actions from '../actionTypes/weatherForecasts'

export declare interface WeatherForecastsRequest {
    startDateIndex: number;
}

export declare interface WeatherForecastsResponse {
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

export const weatherForecastRequest = createAction<WeatherForecastsRequest>(Actions.WEATHER_FORECASTS_REQUEST);
export const weatherForecastInProgress = createAction<WeatherForecastsRequest>(Actions.WEATHER_FORECASTS_IN_PROGRESS);
export const weatherForecastSuccess = createAction<WeatherForecastsResponse>(Actions.WEATHER_FORECASTS_SUCCESS);
export const weatherForecastFailure = createAction<WeatherForecastsRequest>(Actions.WEATHER_FORECASTS_FAILURE);

export const weatherForecastActions = {
    weatherForecastRequest,
    weatherForecastInProgress,
    weatherForecastSuccess,
    weatherForecastFailure
};
