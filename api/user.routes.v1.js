var express    = require('express');
var routes     = express.Router();
var mongodb    = require('../config/mongo.db');
var Book = require('../model/book.model');
const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "admin"));
var session = driver.session();

routes.get('/books', function(req, res) {
    res.contentType('application/json');
    Book.find({})
        .then((books) => {
            console.log(books);
            if (books.length     === 0) {
                res.status(200).json('There are no books');
            }
            else {
                res.status(200).json(books);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/books/:_id', function(req, res) {
    res.contentType('application/json');
    Book.find({ _id: req.params._id} )
        .then((books) => {
            console.log(books);
            if (books.length     === 0) {
                res.status(200).json('There are no books');
            }
            else {
                res.status(200).json(books);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/books', function(req, res) {
  var bookTitle = req.body.title;
  var bookLength = req.body.length;
  var bookLanguage = req.body.language;
  var bookIsbn = req.body.isbn;
  var bookImageURL = req.body.imageURL;

  var authorFirstName = req.body.author.firstName;
  var authorLastName = req.body.author.lastName;
  var authorDateOfBirth = req.body.author.dateOfBirth;
  var authorImageURL = req.body.author.authorImageURL;

  var publisherName = req.body.publisher.name;
  var publisherAbbreviation = req.body.publisher.abbreviation;
  var publisherLocation = req.body.publisher.location;
  var publisherKvkNumber = req.body.publisher.kvkNumber;


  session
    .run("MERGE(n:Book {title:{neoTitle}, length:{neoLength}, language:{neoLanguage}, isbn:{neoISBN}, imageURL:{neoImageURL}})",
    {neoTitle: bookTitle, neoLength: bookLength, neoLanguage: bookLanguage, neoISBN: bookIsbn, neoImageURL: bookImageURL})
    session.close();

    session
    .run("MERGE(g:Author {firstName:{neoFirstName}, lastName:{neoLastName}, dateOfBirth:{neoDateOfBirth}, authorImageURL:{neoAuthorImageURL}}) RETURN g",
    {neoFirstName: authorFirstName, neoLastName: authorLastName, neoDateOfBirth: authorDateOfBirth, neoAuthorImageURL: authorImageURL})
    session.close();


    session
    .run("MATCH(a:Book {title:{neoTitle}}),(b:Author {firstName:{neoFirstName}}) MERGE(a)-[r:WRITTEN_BY]->(b) RETURN a,b",
    {neoTitle: bookTitle, neoFirstName: authorFirstName})
    session.close();


    session
    .run("MERGE(n:Publisher {name:{neoPublisherName}, abbreviation:{neoAbbreviation}, location:{neoLocation}, kvkNumber:{neoKvkNumber}}) RETURN n",
    {neoPublisherName: publisherName, neoAbbreviation: publisherAbbreviation, neoLocation: publisherLocation, neoKvkNumber: publisherKvkNumber})
    session.close();

    session
    .run("MATCH(a:Book {title:{neoTitle}}),(b:Publisher {name:{neoPublisherName}}) MERGE(a)-[r:PUBLISHED_BY]->(b) RETURN a,b",
    {neoTitle: bookTitle, neoPublisherName: publisherName})
    .then(function(result) {
      res.status(200).json({"response": "BlogPost added to front page."});
      session.close();
    })
    .catch((error) => {
      res.status(400).json(error);
    });

    Book.create(
        req.body,
        function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});

routes.put('/books/:_id', function(req, res) {
    console.log(req);
    Book.findOneAndUpdate({_id: req.params._id},
       req.body,
            {
                runValidators: true
            },
            function(err, result) {
              if (err) return res.send(err);
              res.send(result);
        });
});

routes.delete('/books/:_id', function(req, res) {
    Book.remove({_id: req.params._id},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});



routes.get('/authors/:firstName', function (req, res) {
  var authorFirstName = req.params.firstName;

  session
    .run("MATCH (:Author { firstName:{neoAuthorFirstName}})-[:WRITTEN_BY]-(b:Book) RETURN b", {neoAuthorFirstName: authorFirstName})
    .then(function(result) {
      res.status(200).json(result);
      session.close();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

routes.get('/publishers/:name', function (req, res) {
  var publisherName = req.params.name;

  session
    .run("MATCH (:Publisher { name:{neoPublisherName}})-[:PUBLISHED_BY]-(b:Book) RETURN b", {neoPublisherName: publisherName})
    .then(function(result) {
      res.status(200).json(result);
      session.close();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});



module.exports = routes;
