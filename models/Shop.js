const Model = require('./Model')
const Utils = require('./../util/Utils');
const OrderDocument = require('./../util/OrderDocument');
const ProductDocument = require('./../util/ProductDocument');

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