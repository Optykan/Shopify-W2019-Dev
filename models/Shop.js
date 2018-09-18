const Model = require('./Model')
const Utils = require('./../util/Utils');
const OrderDocument = require('./../util/OrderDocument');
const ProductDocument = require('./../util/ProductDocument');

class Shop extends Model {
	constructor(name){
		let id = Utils.random('shop-');
		super(id, name);
	}

	static fromData(data){
		let shop = new Shop();
		shop.id = data.id;
		shop.name = data.name;
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