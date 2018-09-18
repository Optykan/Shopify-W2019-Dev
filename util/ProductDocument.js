const Document = require('./Document')
const Product = require('./../models/Product')
const admin = require('firebase-admin');
const db = admin.firestore(); 

class ProductDocument extends Document{

	static async create(data){
		if(!(data instanceof Product)) throw new TypeError("Expected instance of Product, got: " + typeof data);
		return await super.create('products', data);
	}

	static async get(id){
		return await super.get('products', id);
	}

	static async getAll(shopId){
		shopId = shopId.trim();
		let products = await super.getAll('products');
		products = products.filter(product=>{
			return product.shop === shopId;
		})
		products = products.map(product=>Product.fromData(product));
		return products;
	}


	static async update(product){
		if(!(product instanceof Product)) throw new TypeError("Expected instance of Product, got: " + typeof data);
		
		return await super.update(product);
	}

	static async delete(id){
		return await super.delete('products', id);
	}

	static async exists(id){
		return await super.exists('products', id);
	}

}

module.exports = ProductDocument;