import { Action } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { fetchWeatherForecasts } from '../../services/weatherForecasts';
import {
    WEATHER_FORECASTS_REQUEST
} from '../actionTypes/weatherForecasts';
import {
    WeatherForecastsRequest,
    weatherForecastInProgress,
    weatherForecastSuccess,
    weatherForecastFailure
} from '../actions/weatherForecasts';

function * fetchWeatherForecastsSaga(action: Action<WeatherForecastsRequest>) {
    const startDateIndex = action.payload.startDateIndex;
    yield put(weatherForecastInProgress({ startDateIndex }));
    try {
        const forecasts = yield call(fetchWeatherForecasts, startDateIndex);
        yield put(weatherForecastSuccess({ startDateIndex, forecasts }));
    } catch (err) {
        yield put(weatherForecastFailure({ startDateIndex, err }));
    }
}

export function * sagas () {
    yield takeEvery(WEATHER_FORECASTS_REQUEST, fetchWeatherForecastsSaga);
}
