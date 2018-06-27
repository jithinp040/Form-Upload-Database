var express = require('express')
var app = express()
var mysql = require('mysql')

/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('express-myconnection')
/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */ 
var config = require('./config')
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
app.use(myConnection(mysql, dbOptions, 'pool'))

var bodyParser = require('body-parser')
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var expressValidator = require('express-validator')
app.use(expressValidator())


/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 

/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
// SHOW LIST OF USERS
app.get('/list', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM customer ',function(err, rows, fields) {
			//if(err) throw er
			if (err) {
				console.log(err)
				res.json([{
					data: ''
				}])
			} else {
				console.log(rows)// send to views/user/list.ejs template file
				res.json({
					data: rows
				})
			}
		})
	})
})



// ADD NEW USER POST ACTION
app.post('/insert', function(req, res, next){	   //No errors were found.  Passed Validation!
	res.set('Content-type', 'application/x-www-form-urlencoded')
	console.log("yes")
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		console.log(req.body.name)
			var user = {
			name: req.body.name,
			age: req.body.age,
            product: req.body.product,
            address:req.body.address,
            amount:req.body.amount
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO customer SET ?', user, function(err, result) {
				//if(err) throw err
				if (err) {
					console.log(err)
					
					// send to views/user/add.ejs
					res.json([{	
						name:req.body.name,
						product:req.body.product,
						address:req.body.address,
						amount:req.body.amount,
						age:req.body.age
					}])
				} else {				
					console.log('success Data added successfully!')
					console.log(user)
					// send to views/user/add.ejs
				res.json({	
                    name:req.body.name,
                    product:req.body.product,
                    address:req.body.address,
                    amount:req.body.amount,
                    age:req.body.age
				})
			}
		})
	})
})


// EDIT USER POST ACTION
app.put('/update/(:id)', function(req, res, next) {  //No errors were found.  Passed Validation!
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var user ={
			name: req.body.name,
			age: req.body.age,
            product: req.body.product,
            address:req.body.address,
            amount:req.body.amount
		}
		var ID= req.params.id
		req.getConnection(function(error, conn) {
			conn.query('UPDATE customer SET ? WHERE id = ' + ID, user, function(err, result) {
				//if(err) throw errc
				if (err) {
					console.log(err)
					
					// send to views/user/add.ejs
					res.json({
                        name: req.body.name,
                        age: req.body.age,
                        product: req.body.product,
                        address: req.body.address,
                        amount: req.body.amount
					})
				} else {
					console.log('success Data updated successfully!')
					
					// send to views/user/add.ejs
					res.json({
                        name: req.body.name,
                        age: req.body.age,
                        product: req.body.product,
                        address: req.body.address,
                        amount: req.body.amount
					})
				}
			})
		})   //Display errors to user
})

// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
	var ID= req.params.id
	console.log(ID)
	res.set('Content-type', 'application/x-www-form-urlencoded')
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM customer WHERE id = '+ID, function(err, result) {
			//if(err) throw err
			if (err) {
				console.log(err)
			} else {
				console.log('success User deleted successfully! id = ' + ID)
				// redirect to users list 
			}
		})
	})
})

app.get('/search', function(req, res, next) {
	req.getConnection(function(error, conn) {
		var nam = req.query.name
		console.log(nam)
		conn.query('SELECT * FROM customer WHERE name = ?',nam,function(err, rows, fields) {
			//if(err) throw er
			if (err) {
				console.log(err)
				res.json([{
					data: ''
				}])
			} else {
				console.log(rows)// send to views/user/list.ejs template file
				res.json({
					data: rows
				})
			}
		})
	})
})


app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})