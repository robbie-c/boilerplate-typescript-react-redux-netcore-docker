import { CounterState } from './counter';
import { WeatherForecastsState } from './weatherForecasts';
import { PostsState } from './posts';

export declare type ApplicationState = {
    counter: CounterState;
    weatherForecasts: WeatherForecastsState;
    posts: PostsState
};
