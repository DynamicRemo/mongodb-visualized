var express = require('express');
var router = express.Router();
var path = require('path');
var async = require("async");
var currentDB;

router.get('/all_collections', function(req, res, next) {
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
		            callback(null, numOfDocs);
		        });
		    }

			async.map(collInfos, findCounts, function(err, results){
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

// Connection URL 
// var url = 'mongodb://localhost:27017/mongodbapi';
var url = 'mongodb://<connection-url>/<database-name>';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
	// For the Global Variable
	currentDB = db;
	console.log("Server Connected");
});

var insertDocuments = function(db, callback) {
	// Get the documents collection 
	var collection = db.collection('docs');
	// Insert some documents 
	collection.insertMany([
		{a : 1}, {a : 2}, {a : 3}
	], function(err, result) {
		console.log("Inserted 3 documents into the document collection");
		callback(result);
	});
}

var findCollections = function(db, callback) {
	// Get all the collections 
	db.listCollections().toArray(function(err, collInfos) {
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
		console.log("Found the following records");
		console.log("Number of Records: " + docs.length );
		console.dir(docs);
		callback(docs);
	});
}

module.exports = router;
