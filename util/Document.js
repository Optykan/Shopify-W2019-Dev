const ResponseWrapper = require('./ResponseWrapper');
const Model = require('./../models/Model.js');
const admin = require('firebase-admin');
const db = admin.firestore(); 

class Document {
	static async create(collection, data){
		let insert = data.toPlainObject();
		let ref = db.collection(collection).doc(insert.id);
		return await ref.set(insert);
	}

	static async update(data){
		
	}

	static async delete(collection, id){
		return await db.collection(collection).doc(id).delete();
	}

	static async get(collection, id){
		let ref = db.collection(collection).doc(id);
		let doc = await ref.get();
		if(!doc.exists){
			let err = new Error(`No document found at ${collection}/${id}`);
			err.status = ResponseWrapper.STATUS.NOT_FOUND;
			throw err;
		} else {
			return doc.data();
		}			
	}

	static async getAll(collection) {
		let ref = db.collection(collection);
		let snapshot = await ref.get();
		if(!doc.exists){
			let err = new Error(`No document found at ${collection}/`);
			err.status = ResponseWrapper.STATUS.NOT_FOUND;
			throw err;
		} else {
			let docs = snapshot.map(doc=>doc.data());
			return docs;
		}			
	}

	static async exists(collection, id){
		let doc = await db.collection(collection).doc(id);
		return (await doc.get()).exists;
	}
}

module.exports = Document;