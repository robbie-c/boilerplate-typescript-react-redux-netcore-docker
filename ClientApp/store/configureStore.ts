import { History } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers, Store, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import * as ReducersModule from './reducers';
import { ApplicationState } from './types';
import { loggerOpts } from './utils/logger';
import * as sagas from './sagas';
import { CustomWindow } from '../types/global';

const sagaMiddleware = createSagaMiddleware();

const getDevMiddleware = () => {
    return [createLogger(loggerOpts)];
};

const getMiddleware = (history): Middleware[] => {
    const customWindow = typeof window !== 'undefined' && window as CustomWindow;
    const debug = (customWindow !== null) && customWindow.__DEV__ ;
    const middleware = [ sagaMiddleware, thunkMiddleware, routerMiddleware(history) ];
    return debug ? [ ...middleware, ...getDevMiddleware() ] : middleware;
};

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    // If devTools is installed, connect to it
    const createStoreWithMiddleware = composeWithDevTools(
        applyMiddleware(...getMiddleware(history)),
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(ReducersModule.reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<ApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require<typeof ReducersModule>('./reducers');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    // Run all sagas
    Object.keys(sagas).map(name => sagaMiddleware.run(sagas[name]));

    return store;
}

function buildRootReducer(allReducers: {}) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }));
}
