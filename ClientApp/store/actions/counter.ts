import { createAction } from 'redux-actions';
import * as Actions from '../actionTypes/counter';

export const decrementCount = createAction<void>(Actions.DECREMENT_COUNT);
export const incrementCount = createAction<void>(Actions.INCREMENT_COUNT);

export const counterActions = {
    decrementCount,
    incrementCount
};