var express = require('express');
var router = express.Router();
var path = require('path');
var async = require("async");
var currentDB;

router.get('/all_collections', function(req, res, next) {
	// console.log("CurrentDB");
	// console.log(currentDB);

	currentDB.listCollections().toArray(function(err, collInfos) {
		console.log("All Collections");
		console.log("Number of Collections: " + collInfos.length );
		console.dir(collInfos);

	    if (!err) {
	    	res.send(collInfos);
	    } else {
	    	res.send([]);
	    }
	});
});

router.get('/all_collections_count', function(req, res, next) {
	currentDB.listCollections().toArray(function(err, collInfos) {
	    if (!err) {
	    	var findCounts = function(coll,callback){
				currentDB.collection(coll.name).count({}, function(error, numOfDocs){
		        	// console.log(coll.name + " - " + numOfDocs);
		            callback(null, numOfDocs);
		        });
		    }

			async.map(collInfos, findCounts, function(err, results){
				// console.log("ASYNCCCC");
				console.dir(results);
			    if (!err) {
			    	res.send(results);
			    } else {
			    	res.send([]);
			    }
			});
	    } else {
	    	res.send([]);
	    }
	});
});

var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');

// Connection URL 
var url = 'mongodb://localhost:27017/mongodbapi';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
	// For the Global Variable
	currentDB = db;
	// assert.equal(null, err);
	console.log("Connected correctly to server");
	// insertDocuments(db, function() {
	// 	findCollections(db, function() {
	// 		findDocuments(db, function() {
	// 			db.close();
	// 		});
	// 	});
	// });
});

var insertDocuments = function(db, callback) {
	// Get the documents collection 
	var collection = db.collection('docs');
	// Insert some documents 
	collection.insertMany([
		{a : 1}, {a : 2}, {a : 3}
	], function(err, result) {
		// assert.equal(err, null);
		// assert.equal(3, result.result.n);
		// assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the document collection");
		callback(result);
	});
}

var findCollections = function(db, callback) {
	// Get all the collections 
	db.listCollections().toArray(function(err, collInfos) {
	    // collInfos is an array of collection info objects that look like:
	    // { name: 'test', options: {} }
	    // assert.ok(items.length >= 1);

		console.log("Found the following Collections");
		console.log("Number of Collections: " + collInfos.length );
		console.dir(collInfos);
		callback(collInfos);
	});
}

var findDocuments = function(db, callback) {
	// Get the documents collection 
	var collection = db.collection('documents');
	// Find some documents 
	collection.find({}).toArray(function(err, docs) {
		// assert.equal(err, null);
		// assert.equal(2, docs.length);
		console.log("Found the following records");
		console.log("Number of Records: " + docs.length );
		console.dir(docs);
		callback(docs);
	});
}

module.exports = router;
