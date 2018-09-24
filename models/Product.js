const Model = require('./Model')
const Utils = require('./../util/Utils');

/* A Product represents a product in a store. It contains the following fields:
 * - value : the value of the product
 * - shop : the ID of the shop
 * - id : the ID of the product
 * - name: the name of the product
 */

class Product extends Model {
	constructor(name, shop, value){
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