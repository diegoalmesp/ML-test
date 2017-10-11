import React, { Component } from 'react';
import './styles.css';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as breadcrumbsActions from '../../actions/breadcrumbsActions';

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      loading: true
    }
  }

  componentDidMount() {
    let product = this._getProduct(this.props.match.params.id);

    product.then((data) => {
        this.setState({ product: data, loading: !this.state.loading });
        this.props.actions.updateBreadcrumbs(data.categories);
      }).catch((err) => {
        console.error(err);
      })
  }

  _getProduct(search) {
    return fetch(`http://localhost:3001/api/items/${search}`)
      .then((response) => {
        return response.json();
      });
  }

  render() {
    const product = this.state.product;

    if(this.state.loading) {
      return <div className="loading"></div>
    }

    return (
      <div className="row ML-details-container">
        <div className="row">
          <div className="col-md-8">
            <img src={ product.picture } alt="Imagen de producto" />
            <div className="block32" />
            <div className="block32" />
            <h3>Descripción del producto</h3>
            <div className="block32" />
            <p>{ ReactHtmlParser(product.description) }</p>
          </div>
          <div className="col-md-4">
            <p>{ product.condition === 'new' ? 'Nuevo' : 'Usado' } - { product.sold_quantity > 1 ? `${product.sold_quantity} vendidos` : `${product.sold_quantity} vendido` }</p>
            <div className="block16" />
            <h3>{ product.title }</h3>
            <div className="block32" />
            <h1>$ { product.price.amount }</h1>
            <div className="block32" />
            <button type="button" className="btn btn-primary btn-lg btn-block ML-btn-blue">Comprar</button>
          </div>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(breadcrumbsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Item);
