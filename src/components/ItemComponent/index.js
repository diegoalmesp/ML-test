import React from 'react';
import { Link } from 'react-router-dom';
import ic_shipping from './ic_shipping.png';

import './styles.css';

const ItemComponent = ({product}) => (
  <div className="row ML-product-container">
    <Link to={`/items/${ product.id }`}>
      <section className="col-md-2 ML-product-thumb">
        <img src={ product.picture } alt="Imagen del producto" width="180" />
      </section>
      <section className="col-md-10 ML-product-specs">
        <div className="row">
          <div className="col-md-8">
            <div className="block16" />
            <h3>
              $ { product.price.amount }
              { product.free_shipping ? <img className="ML-free-shipping" src={ic_shipping} alt="ícono envío gratis" /> : '' }
            </h3>
            { this.priceAndShipment }
            <div className="block32" />
            <h4>{ product.title }</h4>
          </div>
          <div className="col-md-4">
            <p className="ML-product-state">{ product.address }</p>
          </div>
        </div>
      </section>
    </Link>
  </div>
);

export default ItemComponent;
