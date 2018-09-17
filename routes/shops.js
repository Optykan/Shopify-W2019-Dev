const ResponseWrapper = require('./../util/ResponseWrapper');
const ShopDocument = require('./../util/ShopDocument');
const Shop = require('./../models/Shop');

var express = require('express');
var router = express.Router();

/* GET shops */
router.get('/', function(req, res, next) {
  
});

router.get('/:id', async function(req, res, next) {
	try {
		let result = await ShopDocument.get(req.params.id);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Shop successfully'
		)).send();
	} catch (e){
		return (new ResponseWrapper(
			res, 
			e,
		)).send();
	}
});

router.post('/', async function(req, res, next){
	let shop = new Shop('Test name');
	try {
		await ShopDocument.create(shop);
		return (new ResponseWrapper(
			res,
			{},
			'Shop ' + shop.id + ' created successfully',
		)).send();
	} catch (e) {
		return (new ResponseWrapper(
			res, 
			e,
		)).send();
	}
});

router.put('/:id', async function(req, res, next){
	let shop = new Shop(
		req.body.name
	)
})

router.delete('/:id', async function(req, res, next){
	try{
		console.log(await ShopDocument.exists(req.params.id));
		if(!(await ShopDocument.exists(req.params.id))){
			let err = new Error('Shop ' + req.params.id + ' not found');
			err.status = ResponseWrapper.STATUS.NOT_FOUND;
			throw err;
		}

		await ShopDocument.delete(req.params.id);

		return (new ResponseWrapper(
			res,
			{},
			'Shop ' + req.params.id + ' deleted successfully',
		)).send();
	} catch (e){
		return (new ResponseWrapper(
			res, 
			e
		)).send();
	}
})

module.exports = router;
