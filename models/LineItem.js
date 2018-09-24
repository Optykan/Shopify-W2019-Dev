const Model = require('./Model');
const ProductDocument = require('./../util/ProductDocument');
const Utils = require('./../util/Utils');

/* A LineItem represents an instance of a line item. It contains the following fields:
 * - value : the value of the product this line item represents
 * - product : the ID of the product
 * - order : the ID of the order
 * - id : the ID of the line item
 * - name: the name of the line item, is currently equal to the ID
 */
class LineItem extends Model {
	constructor(product, order, value){
		if(!product || !order || (!value && value !== 0)) throw new TypeError(`All arguments required; got: product=${product}, order=${product}, value=${value}`);
		
		let id = Utils.random('lineItem-');
		super(id, id);
		this.value = value;
		this.product = product;
		this.order = order;
	}

	static fromData(data){
		let lineItem = new LineItem(data.name, data.product, data.value);
		lineItem.id = data.id;
		return lineItem;
	}

	static async make(productId, orderId){
		let product = await ProductDocument.get(productId);
		let lineItem = new LineItem(product.id, orderId, product.value);
		return lineItem;
	}
}

module.exports = LineItem;