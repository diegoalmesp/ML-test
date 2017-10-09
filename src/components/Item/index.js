import React, { Component } from 'react';
import './styles.css';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      loading: true
    }
  }

  componentWillMount() {
    this._getProduct(this.props.match.params.id);
  }

  _getProduct(search) {
    fetch(`http://localhost:3001/api/items/${search}`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({ product: data, loading: !this.state.loading });
      }).catch((err) => {
        console.error(err);
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
            <img src={ product.pictures[0].url } alt="Imagen de producto" />
            <h3>Descripción del producto</h3>
            <p>{ ReactHtmlParser(product.description) }</p>
          </div>
          <div className="col-md-4">
            <p>{ product.condition == 'new' ? 'Nuevo' : 'Usado' } - { product.sold_quantity > 1 ? `${product.sold_quantity} vendidos` : `${product.sold_quantity} vendido` }</p>
            <h4>{ product.title }</h4>
            <h1>$ { product.price }</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default Item;
