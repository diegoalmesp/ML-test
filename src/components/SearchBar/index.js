import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import ic_search from './ic_Search.png';
import logo_ml from './Logo_ML.png';

import './styles.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(e.target.findProduct.value);

    this.props.history.push(`/items?q=${e.target.findProduct.value}`);
  }

  render() {
    const placeholder = "Nunca dejes de buscar";
    const alt_logo = "Logo de Mercadolibre";
    const alt_icono = "Ícono de búsqueda";

    return (
      <Navbar className="navbar-fixed-top ML-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to={'/'} className="navbar-brand">
              <img alt={ alt_logo } src={ logo_ml } />
            </Link>
          </div>

          <form className="navbar-form navbar-left" role="search" onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <div className="input-group">

                <input
                  type="text"
                  className="form-control"
                  id="findProduct"
                  placeholder={ placeholder } />

                <div className="input-group-addon">
                  <img alt={ alt_icono } src={ ic_search } />
                </div>
              </div>
            </div>
          </form>
        </div>

      </Navbar>
    );
  }
}

export default withRouter(SearchBar);