import { createSelector } from 'reselect';
import { ApplicationState } from '../types';

export function selectCounter(state: ApplicationState) {
    return state.counter;
}
