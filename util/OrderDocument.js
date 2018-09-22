const Document = require('./Document');
const Order = require('./../models/Order');
const admin = require('firebase-admin');
const LineItem = require('./../models/LineItem');
const LineItemDocument = require('./LineItemDocument');
const db = admin.firestore(); 

class OrderDocument extends Document{

	/* create(data) creates a representation of an Order in firebase
	 * @param { Order } data
	  */
	static async create(data){
		if(!(data instanceof Order)) throw new TypeError("Expected instance of Order, got: " + typeof data);

		data.lineItems = data.lineItems.map(productId=>{
			return LineItem.make(productId, data.id);
		});
		data.lineItems = await Promise.all(data.lineItems);

		console.log(data.lineItems)

		let toMake = data.lineItems.map(lineItem=>{
			return LineItemDocument.create(lineItem);
		})
		await Promise.all(toMake);

		data.recalculateValue();

		return await super.create('orders', data);
	}

	static async getAll(shopId){
		shopId = shopId.trim();
		let orders = await super.getAll('orders');
		orders = orders.filter(order=>{
			return order.shop === shopId;
		})
		orders = orders.map(order=>Order.fromData(order));
		return orders;
	}

	static async get(id){
		return await super.get('orders', id);
	}

	static async update(order){
		/* Updating an order is slightly different as we 
		 * have to recalculate the value of the line items 
		 */
		if(!(order instanceof Order)) throw new TypeError("Expected instance of Order, got: " + typeof data);
		if(!order.lineItems){
			await order.loadLines();
		} else {
			order.recalculateValue();
		}
		
		return await super.update('orders', order);
	}

	static async delete(id){
		return await super.delete('orders', id);
	}

	static async exists(id){
		return await super.exists('orders', id);
	}

}

module.exports = OrderDocument;