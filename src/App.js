import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import './App.css';

import SearchBar from './components/SearchBar';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './components/Home';
import ItemsList from './components/ItemsList';
import Item from './components/Item';

const store = configureStore();

const App = () => (
  <Provider store={store} >
    <Router>
      <div>
        <header>
          <SearchBar />
        </header>
        <section className="container ML-container">
          <Breadcrumbs />
          <Route exact path="/" component={ Home } />
          <Route exact path="/items" component={ ItemsList } />
          <Route path="/items/:id" component={ Item } />
        </section>
      </div>
    </Router>
  </Provider>
);

export default App;
