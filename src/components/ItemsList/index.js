import React, { Component } from 'react';
import './styles.css';
import ItemComponent from '../ItemComponent';
import Breadcrumbs from '../Breadcrumbs';

const endpoint = 'http://localhost:3001/api';

class ItemsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: {},
			loading: true
		}
	}

	componentDidMount() {
		let content = this._getContent(this.props.location.search);

		content.then((data) => {
			this.setState({ products: data, loading: !this.state.loading });
		}).catch((err) => {
			console.error(err);
		});
	}

  componentWillReceiveProps(nextProps) {
  	this.setState({ loading: !this.state.loading });

    let content = this._getContent(nextProps.location.search);

    content.then((data) => {
			console.log(`received data: ${data}`);
			this.setState({
				products: data,
				loading: !this.state.loading
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	_getContent(search) {
		const query = new URLSearchParams(search);
		const value = query.get('q');

		return fetch(`${endpoint}/items?q=${value}`)
			.then((response) => {
				return response.json();
			});
	}

  render() {
  	let list = this.state.products.items;

    if(this.state.loading) {
    	return <div className="loading"></div>
    }

    return (
    	<div className="">
    		<Breadcrumbs list={this.state.products.categories} />
	      {list.map((product) => {
	      	return <ItemComponent key={product.id} product={product} />
	      })}
	    </div>
    );
  }
};

export default ItemsList;
