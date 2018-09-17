const Model = require('./Model')
const Utils = require('./../util/Utils');

class Product extends Model {
	constructor(name, shop){
		if(!name || !shop) throw new TypeError(`All arguments required, got: ${name}, ${shop}`);
		
		let id = Utils.random('product-');
		super(id, name);
		this.shop = shop;
	}
}

module.exports = Product;