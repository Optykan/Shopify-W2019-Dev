const Model = require('./Model')
const Utils = require('./../util/Utils');
const LineItemDocument = require('./../util/LineItemDocument');

class Order extends Model {
	constructor(name, shop, lineItems){
		let id = Utils.random('order-');
		super(id, name);
		this.shop = shop.trim();
		this.value = 0;
		if(lineItems && !Array.isArray(lineItems)){
			// lineItems is just one line item, and not an array
			this.lineItems = [ lineItems ]; 
		} else {
			this.lineItems = lineItems;
		}
	}

	static fromData(data){
		let order = new Order(data.name, data.shop, data.lineItems);
		order.id = data.id;
		order.value = data.value || 0;
		return order;
	}

	async loadLines(){
		this.lineItems = await LineItemDocument.getAll(this.id);
		this.recalculateValue();
	}

	recalculateValue(){
		if(!this.lineItems) throw new Error("Cannot recalculate value without line items");
		this.value = this.lineItems.reduce((acc, v)=>{
			return acc + v.value;
		}, 0)
	}
}

module.exports = Order;