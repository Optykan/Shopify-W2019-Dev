const Model = require('./Model');
const Utils = require('./../util/Utils');

class LineItem extends Model {
	constructor(id, name, value = 0, product, order){
		if(!product || !order) throw new Error('Expected product and order.')
			
		id = id || Utils.random('lineItem-');
		super(id, name);
		this.value = value;
		this.product = product;
		this.order = order;
	}
}

module.exports = LineItem;