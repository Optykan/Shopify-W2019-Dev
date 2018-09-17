const Document = require('./Document')
const LineItem = require('./../models/LineItem')
const admin = require('firebase-admin');
const db = admin.firestore(); 

class LineItemDocument extends Document{

	static async create(data){
		if(!(data instanceof LineItem)) throw new TypeError("Expected instance of LineItem, got: " + typeof data);
		return await super.create('lineItems', data);
	}

	static async getAll(parentId){
		parentId = parentId.trim();
		let lineItems = await super.getAll('lineItems');
		lineItems = lineItems.filter(lineItem=>{
			if(parentId.startsWith('shop')){
				return lineItem.shop === parentId;
			} else {
				return lineItem.product === parentId;
			}
		})
		lineItems = lineItems.map(lineItem=>LineItem.fromData(lineItem));
		return lineItems;
	}

	static async get(id){
		return await super.get('lineItems', id);
	}

	static async update(lineItem){
		if(!(lineItem instanceof LineItem)) throw new TypeError("Expected instance of LineItem, got: " + typeof data);
		
		return await super.update(lineItem);
	}

	static async delete(id){
		return await super.delete('lineItems', id);
	}

	static async exists(id){
		return await super.exists('lineItems', id);
	}

}

module.exports = LineItemDocument;