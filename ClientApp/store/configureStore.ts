import { History } from 'history';
import { createStore, applyMiddleware, compose, combineReducers, Store, Middleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as ReducersModule from './reducers';
import { ApplicationState } from './types';
import { CustomWindow } from '../types/global';
import { loggerOpts } from './utils/logger';
import { createLogger } from 'redux-logger';

declare const __DEV__: boolean;

const getMiddleware = (history) => (debug: Boolean): Middleware[] => {
    const windowIfDefined = typeof window === 'undefined' ? null : window as CustomWindow;
    const devToolsExtension = (windowIfDefined && windowIfDefined.devToolsExtension) || (x => x) as Middleware;
    const devMiddleware = [ devToolsExtension as Middleware, createLogger(loggerOpts) ];
    const middleware = [ thunkMiddleware, routerMiddleware(history) ];
    return debug ? [ ...middleware, ...devMiddleware ] : middleware;
};

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    // If devTools is installed, connect to it
    const createStoreWithMiddleware = compose(
        applyMiddleware(...getMiddleware(history)(__DEV__)),
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(ReducersModule.reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<ApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store', () => {
            const nextRootReducer = require<typeof ReducersModule>('./');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers: {}) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }));
}
