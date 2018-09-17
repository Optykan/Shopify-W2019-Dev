const Model = require('./Model')
const Utils = require('./../util/Utils');

class Shop extends Model {
	constructor(name){
		let id = Utils.random('shop-');
		super(id, name);
	}
}

module.exports = Shop;