const Model = require('./Model')
const Utils = require('./../util/Utils');

class Product extends Model {
	constructor(name, shop, value){
		// check not necessary if w
		// if(!name || !shop || (!value && value !== 0)) throw new TypeError(`All arguments required; got: name=${name}, shop=${shop}, value=${value}`);
		
		let id = Utils.random('product-');
		super(id, name);
		this.shop = shop.trim ? shop.trim() : shop;
		this.value = value || 0;
	}

	static fromData(data){
		let product = new Product(data.name, data.shop, data.value);
		product.id = data.id;
		return product;
	}

}

module.exports = Product;