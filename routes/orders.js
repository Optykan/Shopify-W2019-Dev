const ResponseWrapper = require('./../util/ResponseWrapper');
const OrderDocument = require('./../util/OrderDocument');
const Order = require('./../models/Order');

var express = require('express');
var router = express.Router();

/* GET orders */
router.get('/', async function(req, res, next) {
  	try {
		let result = await OrderDocument.getAll(req.params.shopId);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Orders successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(
			res, 
			e,
		)).send();
	}
});

router.get('/:id', async function(req, res, next) {
	try {
		let result = await OrderDocument.get(req.params.id);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Order successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(
			res, 
			e,
		)).send();
	}
});

router.post('/', async function(req, res, next){
	let name = req.body.name;
	let shopId = req.params.shopId.trim();
	let order = new Order(name, shopId);
	
	try {
		await OrderDocument.create(order);
		return (new ResponseWrapper(
			res,
			order,
			'Order ' + order.id + ' created successfully',
			ResponseWrapper.STATUS.CREATED
		)).send();
	} catch (e) {
		console.error(e);
		return (new ResponseWrapper(
			res, 
			e,
		)).send();
	}
});

router.put('/:id', async function(req, res, next){
	let order = new Order(
		req.body.name
	)
})

router.delete('/:id', async function(req, res, next){
	try{
		if(!(await OrderDocument.exists(req.params.id))){
			let err = new Error('Order ' + req.params.id + ' not found');
			err.status = ResponseWrapper.STATUS.NOT_FOUND;
			throw err;
		}

		await OrderDocument.delete(req.params.id);

		return (new ResponseWrapper(
			res,
			{},
			'Order ' + req.params.id + ' deleted successfully',
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(
			res, 
			e
		)).send();
	}
})

module.exports = router;
