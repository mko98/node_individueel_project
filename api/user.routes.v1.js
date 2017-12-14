var express    = require('express');
var routes     = express.Router();
var mongodb    = require('../config/mongo.db');
var Book = require('../model/book.model');
var parser = require('parse-neo4j');
const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://hobby-cibhificdbmngbkekladhjal.dbs.graphenedb.com:24786", neo4j.auth.basic("books", "b.8qcEua22tF7V.eqexi1fjfYNV2ypd"));
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


  var result = session
    .run("MERGE(n:Book {title:{neoTitle}, length:{neoLength}, language:{neoLanguage}, isbn:{neoISBN}, imageURL:{neoImageURL}})",
    {neoTitle: bookTitle, neoLength: bookLength, neoLanguage: bookLanguage, neoISBN: bookIsbn, neoImageURL: bookImageURL})
    session.close();

    var result = session
    .run("MERGE(g:Author {firstName:{neoFirstName}, lastName:{neoLastName}, dateOfBirth:{neoDateOfBirth}, authorImageURL:{neoAuthorImageURL}}) RETURN g",
    {neoFirstName: authorFirstName, neoLastName: authorLastName, neoDateOfBirth: authorDateOfBirth, neoAuthorImageURL: authorImageURL})
    session.close();


    var result = session
    .run("MATCH(a:Book {title:{neoTitle}}),(b:Author {firstName:{neoFirstName}}) MERGE(a)-[r:WRITTEN_BY]->(b) RETURN a,b",
    {neoTitle: bookTitle, neoFirstName: authorFirstName})
    session.close();


    var result = session
    .run("MERGE(n:Publisher {name:{neoPublisherName}, abbreviation:{neoAbbreviation}, location:{neoLocation}, kvkNumber:{neoKvkNumber}}) RETURN n",
    {neoPublisherName: publisherName, neoAbbreviation: publisherAbbreviation, neoLocation: publisherLocation, neoKvkNumber: publisherKvkNumber})
    session.close();

    var result = session
    .run("MATCH(a:Book {title:{neoTitle}}),(b:Publisher {name:{neoPublisherName}}) MERGE(a)-[r:PUBLISHED_BY]->(b) RETURN a,b",
    {neoTitle: bookTitle, neoPublisherName: publisherName})
    .then(function(result) {
      session.close();
    })
    .catch((error) => {
    });

    Book.create(
        req.body,
        function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});

routes.put('/books/:title', function(req, res) {
  // var bookID = req.body._id;
  var bookTitle = req.params.title;
  var bookTitleBody = req.body.title;
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

  var result = session
  .run("MATCH (n { title:{neoTitle}})-[r:PUBLISHED_BY]->() DELETE r",
  {neoTitle: bookTitle})
  session.close();

  var result = session
  .run("MATCH (n { title:{neoTitle}})-[r:WRITTEN_BY]->() DELETE r",
  {neoTitle: bookTitle})
  session.close();

  var result = session
  .run("MATCH(n:Book {title:{neoTitle}}) SET n.title={neoTitleBody}, n.length={neoLength}, n.language={neoLanguage}, n.isbn={neoISBN}, n.imageURL={neoImageURL}",
  {neoTitle: bookTitle, neoLength: bookLength, neoLanguage: bookLanguage, neoISBN: bookIsbn, neoImageURL: bookImageURL, neoTitleBody: bookTitleBody})
  session.close();

  var result = session
  .run("MATCH(a:Book {title:{neoTitleBody}}),(b:Publisher {name:{neoPublisherName}}) MERGE(a)-[r:PUBLISHED_BY]->(b) RETURN a,b",
  {neoTitleBody: bookTitleBody, neoPublisherName: publisherName})
  session.close();

  var result = session
  .run("MATCH(a:Book {title:{neoTitleBody}}),(b:Author {firstName:{neoFirstName}}) MERGE(a)-[r:WRITTEN_BY]->(b) RETURN a,b",
  {neoTitleBody: bookTitleBody, neoFirstName: authorFirstName})
  var parsedResult = result
      .then(parser.parse)
      .then(function(parsed){
          parsed.forEach(function(parsedRecord) {
              console.log(parsedRecord);
          });
      })
      .catch(function(parseError) {
          console.log(parseError);
      });


    Book.findOneAndUpdate({title: req.params.title}, req.body,
            {
                runValidators: true
            },
            function(err, result) {
              if (err) return res.send(err);
              res.send(result);
        });

});

routes.delete('/books/:title', function(req, res) {
    var bookTitle = req.params.title;

    session
    .run("MATCH (n:Book{title:{neoTitle}}) DETACH DELETE n",
    {neoTitle: bookTitle})
    .then(function(result) {
    session.close();
  })
  .catch((error) =>  {
  });

    Book.remove({title: req.params.title},
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
