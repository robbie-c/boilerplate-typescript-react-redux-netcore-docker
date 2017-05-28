import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { CounterState } from '../store/types/counter';
import { counterActions } from '../store/actions/counter';
import { selectCounter } from '../store/selectors/counter';

type CounterProps =
    CounterState
    & typeof counterActions
    & RouteComponentProps<{}>;

class Counter extends React.Component<CounterProps, {}> {
    public render() {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p>Current count: <strong>{this.props.count}</strong></p>

                <button onClick={() => { this.props.incrementCount(); }}>Increment</button>
            </div>
        );
    }
}

// Wire up the React component to the Redux store
export default connect(
    selectCounter,
    dispatch => bindActionCreators(counterActions, dispatch)
)(Counter) as typeof Counter;
