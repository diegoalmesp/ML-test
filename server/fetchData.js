require('isomorphic-fetch');
const URL = 'https://api.mercadolibre.com';
const limit = 4;

function fetchListOfProducts(query) {
	return fetch(`${URL}/sites/MLA/search?q=${query}&limit=${limit}`)
		.then((response) => {
			if(response.status !== 200) {
				console.log(`ocurrió un problema. Status: ${response.status}`);
				return;
			}
			return response.json();
		});
}

function fetchCategories(list) {
	return fetch(`${URL}/categories/${list.results[0].category_id}`)
		.then((response) => {
			if(response.status !== 200) {
				console.log(`ocurrió un problema. Status: ${response.status}`);
				return;
			}
			return response.json();
		});
}

function fetchFirstProductImage(prodID) {
	return fetch(`${URL}/items/${prodID}`)
		.then((response) => {
			if(response.status !== 200) {
				console.log(`ocurrió un problema. Status: ${response.status}`);
				return;
			}
			return response.json();
		});
}

module.exports = {
	fetchListOfProducts: fetchListOfProducts,
	fetchCategories: fetchCategories,
	fetchFirstProductImage: fetchFirstProductImage
};