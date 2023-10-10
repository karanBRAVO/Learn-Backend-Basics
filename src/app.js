// creating express app
const express = require('express');
const path = require('path');

// connecting to database
require('./connection.js');  // filename of connection file

// import model from model.js file
const learnDB_model = require('./model.js');

// create instance of express app
const app = express();
// set the port
const port = 3000;

// set the view engine
app.set("view engine", "hbs");

// to get the data
app.use(express.urlencoded({
	extended: false
}));

// creating routes
app.get('/', (req, res) => {
	res.render("index");
});

// create operation
app.post('/get-user-data', async (req, res) => {
	try {
		let username = String(req.body.uName);
		let useremail = String(req.body.uEmail);
		if (username.length > 0 && useremail.length > 0) {
			const addDataToDb = new learnDB_model({
				name: username,
				email: useremail
			});
			await addDataToDb.save();
			console.log('[+] Data added to DB');
			res.send('Data added successfully | fill again <a href="/">Visit form fill page</a>');
		}
	}
	catch (err) {
		res.status(400);
		res.send('Unable to add data to db');
		console.log(err);
	}
});

// read operation
app.get('/get-user-data-from-mongodb', (req, res) => {
	learnDB_model.find().then((data) => {
		if (data != null) {
			console.log(`[+] Data Fetched`);
			res.render("index2", { sendData : data });	
		}
	}).catch((err) => {
		console.log(`[-] Error while fetching data`);
		console.log(err);
	})
});

// delete operation
// create endpoint to access the index4 file
app.get('/delete-operation', (req, res) => {
	learnDB_model.find().then((data) => {
		if (data != null) {
			console.log(`[+] Data Fetched`);
			res.render("index4", { sendData : data });	
		}
	}).catch((err) => {
		console.log(`[-] Error while fetching data`);
		console.log(err);
	})
});

// create endpoint to handle delete request
// slug : addition keywords are sent through the request
app.post('/delete-user/:slug1/:slug2', (req, res) => {
	let unique_id = req.body.id;
	learnDB_model.deleteOne({ _id : unique_id }).then((data) => {
		console.log(`[+] Deleted`);
		res.redirect('/delete-operation');  // redirect back to same page
	}).catch((err) => {
		console.log(err);
		res.send(`<h1>[!] Error</h1>`);
	})
});

// update operation
// create endpoint to render index3 file
app.get('/update-operation', (req, res) => {
	learnDB_model.find().then((data) => {
		if (data != null) {
			console.log(`[+] Data Fetched`);
			res.render("index3", { sendData : data });	
		}
	}).catch((err) => {
		console.log(`[-] Error while fetching data`);
		console.log(err);
	})
});

// create endpoint to handle the update request
app.post('/update', (req, res) => {
	let updated_name = req.body.updatedName;
	let updated_email = req.body.updateEmail;
	let unique_id = req.body.id;

	learnDB_model.updateOne({ _id: unique_id },
							{ $set: { 
								name: updated_name,
								email: updated_email
								} 
							}).then((data) => {
									console.log(`Updated`, data);
									res.redirect('/update-operation');
							}).catch((err) => {
								console.log('Error', err);
								res.send(`Error`);
							});
});

// creating a listener
app.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	else {
		console.log(`[+] Server started`);
		console.log(`Visit: http://localhost:${port}`);
	}
});