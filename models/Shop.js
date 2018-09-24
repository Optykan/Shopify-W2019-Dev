const Model = require('./Model')
const Utils = require('./../util/Utils');
const OrderDocument = require('./../util/OrderDocument');
const ProductDocument = require('./../util/ProductDocument');

/* A Shop represents a shop. It contains the following fields:
 * - name : the name of the shop
 * - id : the ID of the shop
 * - orders : an array of Orders associated with this shop
 * - products: an array of Products associated with this shop
 */

class Shop extends Model {
	constructor(name){
		if(!name) throw new TypeError("Expected a name, got " + name)
		let id = Utils.random('shop-');
		super(id, name);
	}

	static fromData(data){
		let shop = new Shop(data.name);
		shop.id = data.id;
		return shop;
	}

	async loadOrders(){
		this.orders = await OrderDocument.getAll(this.id);
	}

	async loadProducts(){
		this.products = await ProductDocument.getAll(this.id);
	}
}

module.exports = Shop;