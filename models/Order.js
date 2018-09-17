const Model = require('./Model')
const Utils = require('./../util/Utils');
const LineItemDocument = require('./../util/LineItemDocument');

class Order extends Model {
	constructor(name, shop){
		let id = Utils.random('order-');
		super(id, name);
		this.shop = shop.trim();
		this.value = 0;
	}

	static fromData(data){
		let order = new Order(data.name, data.shop);
		order.id = data.id;
		order.value = data.value || 0;
		return order;
	}

	async loadLines(){
		this.lineItems = LineItemDocument.getAll(this.shop);
		this.value = this.lineItems.reduce((acc, v)=>{
			return acc + v.value;
		})
	}
}

module.exports = Order;