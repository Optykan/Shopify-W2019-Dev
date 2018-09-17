const Document = require('./Document')
const Shop = require('./../models/Shop')
const admin = require('firebase-admin');
const db = admin.firestore(); 

class ShopDocument extends Document{

	static async create(data){
		if(!(data instanceof Shop)) throw new TypeError("Create expects instance of Shop, got: " + typeof data);
		return await super.create('shops', data);
	}

	static async get(id){
		return await super.get(id);
	}

	static async update(shop){
		if(!(shop instanceof Shop)) throw new TypeError("Create expects instance of Shop, got: " + typeof data);
		
		return await super.update(shop);
	}

	static async delete(id){
		return await super.delete('shops', id);
	}

	static async exists(id){
		return await super.exists('shops', id);
	}

}

module.exports = ShopDocument;