var express = require('express');
var router = express.Router();
const firebase = require('firebase');
const ResponseWrapper = require('./../util/ResponseWrapper');

// test@test.user, password

// quick and dirty
router.post('/signIn', function(req, res, next) {
	firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(user=>{
		firebase.auth().currentUser.getIdToken().then(token=>{
			res.cookie('session', token);
			(new ResponseWrapper(res, token, 'Logged in successfully')).send();
		});
	}).catch(e=>{
		(new ResponseWrapper(res, e)).send();
	})
});

module.exports = router;
