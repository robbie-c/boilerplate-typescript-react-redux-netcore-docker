import { Action, handleActions } from 'redux-actions';
import { WeatherForecastsRequest, WeatherForecastsResponse } from '../actions/weatherForecasts';
import * as Actions from '../actionTypes/weatherForecasts';
import { RequestStatus } from '../../constants/index';
import { WeatherForecastsState } from '../types/weatherForecasts';

const initialState: WeatherForecastsState = {
    startDateIndex: null,
    forecasts: [],
    requestStatus: RequestStatus.Initial
};

export const weatherForecastsReducer = handleActions<WeatherForecastsState, WeatherForecastsRequest | WeatherForecastsResponse>({
    [Actions.WEATHER_FORECASTS_REQUEST]: (state, action) => {
        const startDateIndex = action.payload.startDateIndex;
        return {
            ...state,
            startDateIndex,
            requestStatus: RequestStatus.Requested
        };
    },
    [Actions.WEATHER_FORECASTS_IN_PROGRESS]: (state, action) => {
        const startDateIndex = action.payload.startDateIndex;
        if (startDateIndex === state.startDateIndex) {
            return {
                ...state,
                requestStatus: RequestStatus.InProgress
            };
        } else {
            return state;
        }
    },
    [Actions.WEATHER_FORECASTS_SUCCESS]: (state, action: Action<WeatherForecastsResponse>) => {
        const startDateIndex = action.payload.startDateIndex;
        const forecasts = action.payload.forecasts;
        if (startDateIndex === state.startDateIndex) {
            return {
                startDateIndex,
                forecasts,
                requestStatus: RequestStatus.Success
            };
        } else {
            return state;
        }
    },
    [Actions.WEATHER_FORECASTS_FAILURE]: (state, action) => {
        const startDateIndex = action.payload.startDateIndex;
        if (startDateIndex === state.startDateIndex) {
            return {
                ...state,
                requestStatus: RequestStatus.Failure
            };
        } else {
            return state;
        }
    },
}, initialState);
