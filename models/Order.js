const Model = require('./Model')
const Utils = require('./../util/Utils');

class Order extends Model {
	constructor(id, name, value, shop, lineItems = []){
		id = id || Utils.random('order-');
		super(id, name);
		this.shop = shop;
		this.value = 0;
		this.lineItems = lineItems;
	}
}