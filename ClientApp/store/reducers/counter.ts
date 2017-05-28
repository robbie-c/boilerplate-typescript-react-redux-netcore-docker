import {CounterState} from '../types/counter';
import { handleActions } from 'redux-actions';
import * as Actions from '../actionTypes/counter';

const initialState: CounterState = {
    count: 0
};

export const counterReducer = handleActions<CounterState, void>({
    [Actions.INCREMENT_COUNT]: (state, action) => {
        return { count: state.count + 1 };
    },
    [Actions.DECREMENT_COUNT]: (state, action) => {
        return { count: state.count - 1 };
    },
}, initialState);
