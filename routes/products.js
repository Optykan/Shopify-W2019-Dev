const ResponseWrapper = require('./../util/ResponseWrapper');
const ProductDocument = require('./../util/ProductDocument');
const Product = require('./../models/Product');

var express = require('express');
var router = express.Router();

/* GET products */
router.get('/', function(req, res, next) {
  
});

router.get('/:id', async function(req, res, next) {
	try {
		let result = await ProductDocument.get(req.params.id);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Product successfully'
		)).send();
	} catch (e){
		return (new ResponseWrapper(
			res, 
			e,
		)).send();
	}
});

router.post('/', async function(req, res, next){
	let shopId = req.body.shop;
	let product = new Product('Test name', shopId);
	console.log(product)
	try {
		await ProductDocument.create(product);
		return (new ResponseWrapper(
			res,
			{},
			'Product ' + product.id + ' created successfully',
		)).send();
	} catch (e) {
		return (new ResponseWrapper(
			res, 
			e,
		)).send();
	}
});

router.put('/:id', async function(req, res, next){
	let product = new Product(
		req.body.name
	)
})

router.delete('/:id', async function(req, res, next){
	try{
		console.log(await ProductDocument.exists(req.params.id));
		if(!(await ProductDocument.exists(req.params.id))){
			let err = new Error('Product ' + req.params.id + ' not found');
			err.status = ResponseWrapper.STATUS.NOT_FOUND;
			throw err;
		}

		await ProductDocument.delete(req.params.id);

		return (new ResponseWrapper(
			res,
			{},
			'Product ' + req.params.id + ' deleted successfully',
		)).send();
	} catch (e){
		return (new ResponseWrapper(
			res, 
			e
		)).send();
	}
})

module.exports = router;
