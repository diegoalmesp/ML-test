import React, { Component } from 'react';
import './styles.css';
import ItemComponent from '../ItemComponent';

class ItemsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: {},
			loading: true
		}
	}

  render() {
    if(this.state.loading) {
    	return <div className="loading"></div>
    }

    return (
    	<div className="">
	      {products.items.map((product) => {
	      	return <ItemComponent key={product.id} product={product} />
	      })}
	    </div>
    );
  }
};

let products = {
	"author": {
		"name": "Nombre",
		"lastname": "Apellido"
	},
	"categories": ["Categoría 1", "Categoría 2", "Categoría 3"],
	"items": [
		{
			"id": "123",
			"title": "Cámara Canon 60D",
			"price": {
				"currency": "$",
				"amount": 48000,
				"decimals": 2
			},
			"picture": "picture",
			"condition": "nuevo",
			"free_shipping": true
		},
		{
			"id": "124",
			"title": "Cámara Canon 6D",
			"price": {
				"currency": "$",
				"amount": 68000,
				"decimals": 2
			},
			"picture": "picture",
			"condition": "nuevo",
			"free_shipping": true
		},
		{
			"id": "125",
			"title": "Cámara Canon 1X",
			"price": {
				"currency": "$",
				"amount": 120000,
				"decimals": 2
			},
			"picture": "picture",
			"condition": "nuevo",
			"free_shipping": true
		}
	]
};

export default ItemsList;
