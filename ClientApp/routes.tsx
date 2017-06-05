import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './containers/Layout';
import Home from './containers/Home';
import FetchData from './containers/FetchData';
import Counter from './containers/Counter';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
