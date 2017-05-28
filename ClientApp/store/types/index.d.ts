import { CounterState } from './counter';
import { WeatherForecastsState } from './weatherForecasts';

export declare type ApplicationState = {
    counter: CounterState;
    weatherForecasts: WeatherForecastsState;
};
