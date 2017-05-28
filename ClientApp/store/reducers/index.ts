import { counterReducer } from './counter';
import { weatherForecastsReducer } from './weatherForecasts';

export const reducers = {
    counter: counterReducer,
    weatherForecasts: weatherForecastsReducer
};
