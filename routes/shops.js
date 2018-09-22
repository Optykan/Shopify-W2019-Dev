const ResponseWrapper = require('./../util/ResponseWrapper');
const ShopDocument = require('./../util/ShopDocument');
const Shop = require('./../models/Shop');
const ProductDocument = require('./../util/ProductDocument');
const Product = require('./../models/Product');
const OrderDocument = require('./../util/OrderDocument');
const Order = require('./../models/Order');
const LineItemDocument = require('./../util/LineItemDocument');
const LineItem = require('./../models/LineItem');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

// router.use(function(req, res, next){
// 	let cookie = req.cookies.session || ""
	
// 	admin.auth().verifySessionCookie(cookie, true).then(decodedClaims =>{
// 		next();
// 	}).catch(err=>{
// 		console.error(err)
// 		let error = new Error(err);
// 		error.status = 401;
// 		return next(error);
// 	})
// })

/* GET shops */
router.get('/', async function(req, res, next) {
	try {
		let result = await ShopDocument.getAll();
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Shops successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.get('/:id', async function(req, res, next) {
	try {
		let result = await ShopDocument.get(req.params.id);
		await result.loadOrders();
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Shop successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.post('/', async function(req, res, next){
	try {
		let shop = new Shop(req.body.name);
		let ret = await ShopDocument.create(shop);
		return (new ResponseWrapper(
			res,
			ret,
			'Shop ' + shop.id + ' created successfully',
		)).send();
	} catch (e) {
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.put('/:id', async function(req, res, next){
	try {
		let shop = new Shop(req.body.name)
		shop.id = req.params.id;

		let ret = await ShopDocument.update(shop);
		return (new ResponseWrapper(
			res,
			ret,
			'Shop ' + ret.id + ' updated successfully',
		)).send();
	} catch (e) {
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}

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
		console.error(e);
		return (new ResponseWrapper(
			res, 
			e
		)).send();
	}
})

/* ************************
 * ------ PRODUCTS ------ *
 ************************ */

/* GET products */
router.get('/:shopId/products/', async function(req, res, next) {
	try {
		let result = await ProductDocument.getAll(req.params.shopId);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Products successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.get('/:shopId/products/:id', async function(req, res, next) {
	try {
		let result = await ProductDocument.get(req.params.id);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Product successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.post('/:shopId/products/', async function(req, res, next){
	let shopId = req.params.shopId;
	let name = req.body.name;
	let value = req.body.value;
	
	try {
		let product = new Product(name, shopId, parseFloat(value));
		await ProductDocument.create(product);
		return (new ResponseWrapper(
			res,
			product,
			'Product ' + product.id + ' created successfully',
			ResponseWrapper.STATUS.CREATED
		)).send();
	} catch (e) {
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.put('/:shopId/products/:id', async function(req, res, next){
	let shopId = req.params.shopId;
	let name = req.body.name;
	let value = req.body.value;
	
	try {
		let product = new Product(name, shopId, parseFloat(value));
		product.id = req.params.id;
		let ret = await ProductDocument.update(product);
		return (new ResponseWrapper(
			res,
			ret,
			'Product ' + product.id + ' updated successfully',
			ResponseWrapper.STATUS.OK
		)).send();
	} catch (e) {
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
})

router.delete('/:shopId/products/:id', async function(req, res, next){
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
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
})


/* **********************
 * ------ ORDERS ------ *
 ********************** */

/* GET orders */
router.get('/:shopId/orders/', async function(req, res, next) {
  	try {
		let result = await OrderDocument.getAll(req.params.shopId);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Orders successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.get('/:shopId/orders/:id', async function(req, res, next) {
	try {
		let result = await OrderDocument.get(req.params.id);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Order successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.post('/:shopId/orders/', async function(req, res, next){
	let shopId = req.params.shopId.trim();
	let products = req.body.products || [];
	let name = req.body.name;

	try {
		let order = new Order(name, shopId, products);

		await OrderDocument.create(order);
		return (new ResponseWrapper(
			res,
			order,
			'Order ' + order.id + ' created successfully',
			ResponseWrapper.STATUS.CREATED
		)).send();
	} catch (e) {
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.put('/:shopId/orders/:id', async function(req, res, next){
	let shopId = req.params.shopId;
	let products = req.body.products || [];
	let name = req.body.name;

	try {
		let order = new Order(name, shopId, products);
		order.id = req.params.id;
		let ret = await OrderDocument.update(order);
		return (new ResponseWrapper(
			res,
			ret,
			'Order ' + order.id + ' updated successfully',
		)).send();
	} catch (e) {
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
})

router.delete('/:shopId/orders/:id', async function(req, res, next){
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
		return (new ResponseWrapper(res, e)).send();
	}
})

/* ************************
 * ----- LINE ITEMS ----- *
 ************************ */
 router.get('/:shopId/:parentType/:parentId/lineItems/', async function(req, res, next) {
	try {
		let result = await LineItemDocument.getAll(req.params.parentId);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Line Items successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

router.get('/:shopId/:parentType/:parentId/:lineItemId', async function(req, res, next) {
	try {
		let result = await LineItemDocument.get(req.params.lineItemId);
		return (new ResponseWrapper(
			res,
			result,
			'Retrieved Line Item successfully'
		)).send();
	} catch (e){
		console.error(e);
		return (new ResponseWrapper(res, e)).send();
	}
});

module.exports = router;
