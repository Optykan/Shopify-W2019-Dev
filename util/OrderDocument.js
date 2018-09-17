const Document = require('./Document')
const Order = require('./../models/Order')
const admin = require('firebase-admin');
const db = admin.firestore(); 

class OrderDocument extends Document{

	static async create(data){
		if(!(data instanceof Order)) throw new TypeError("Expected instance of Order, got: " + typeof data);
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
		if(!(order instanceof Order)) throw new TypeError("Expected instance of Order, got: " + typeof data);
		
		return await super.update(order);
	}

	static async delete(id){
		return await super.delete('orders', id);
	}

	static async exists(id){
		return await super.exists('orders', id);
	}

}

module.exports = OrderDocument;