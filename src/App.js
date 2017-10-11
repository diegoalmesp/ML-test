import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './_App.scss';

import SearchBar from './components/SearchBar';

import Home from './components/Home';
import ItemsList from './components/ItemsList';
import Item from './components/Item';

const App = () => (
  <Router>
    <div>
      <header>
        <SearchBar />
      </header>
      <section className="container ML-container">
        <Route exact path="/" component={ Home } />
        <Route exact path="/items" component={ ItemsList } />
        <Route path="/items/:id" component={ Item } />
      </section>
    </div>
  </Router>
);

export default App;
