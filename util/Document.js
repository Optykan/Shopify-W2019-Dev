const ResponseWrapper = require('./ResponseWrapper');
const Model = require('./../models/Model.js');
const admin = require('firebase-admin');
const db = admin.firestore(); 

class Document {
	static async create(collection, data){
		let insert = data.toPlainObject();
		console.log(insert);
		let ref = db.collection(collection).doc(insert.id);
		return await ref.set(insert);
	}

	static async update(collection, data){
		if(!(data instanceof Model)) throw new TypeError("Expected instance of Model, got: " + typeof data);

		let existing = await Document.get(collection, data.id);

		// remove null and undefined keys so we can merge the two objects together
		Object.keys(data).forEach(key=>{
			if(typeof data[key] === "null" || typeof data[key] === "undefined") delete data[key];
		});

		return await Document.create(collection, Object.assign(existing, data));
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
		let snapshot = await db.collection(collection).get();
		let docs = [];
		snapshot.forEach(doc=>{
			docs.push(doc.data());
		});
		return docs;
	}

	static async exists(collection, id){
		let doc = await db.collection(collection).doc(id);
		return (await doc.get()).exists;
	}
}

module.exports = Document;