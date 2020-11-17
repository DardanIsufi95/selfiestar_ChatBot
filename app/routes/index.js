const express = require('express');
const router = express.Router();
const request = require("postman-request")



/* GET home page. */
router.get('/', function (req, res, next) {
	console.log(req.session)
	if (req.session['auth']) {
		res.render('index', {token: req.session['authToken']});
	}else{
		res.render('login');
	}

});

router.post('/', function (req, res, next) {
	request("http://localhost:8000/auth" ,{
		method:"POST",
		form:{
			username: req.body.username,
			password: req.body.password
		}
	},(error, response, body)=>{
		if(body != '0'){
			req.session['auth'] = true
			req.session['authToken'] = body
			req.session.save()
			res.redirect("/")
		}else{
			res.redirect("/")
		}
	}) 
});

router.get('/logout', function (req, res, next) {
	req.session['auth'] = false
	req.session['authToken'] = undefined
	req.session.save()
	res.redirect("/")
});



module.exports = router;