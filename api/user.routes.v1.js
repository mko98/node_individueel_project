//
// ./api/v1/user.routes.v1.js
//
var express    = require('express');
var routes     = express.Router();
var mongodb    = require('../config/mongo.db');
var Book = require('../model/book.model');


// GET ALL (books)

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

// GET ALL (authors)

// routes.get('/authors', function(req, res) {
//     res.contentType('application/json');
//     Author.find({})
//         .then((authors) => {
//         if (authors.length === 0) {
//             res.status(200).json('There are no authors');
//         }
//         else {
//             res.status(200).json(authors);
//         }
//     })
//         .catch((error) => res.status(401).json(error));
// });
//
// // GET ALL (publishers)
//
// routes.get('/publishers', function(req, res) {
//     res.contentType('application/json');
//     Publisher.find({})
//         .then((publishers) => {
//         if (publishers.length === 0) {
//             res.status(200).json('There are no publishers');
//         }
//         else {
//             res.status(200).json(publishers);
//         }
//     })
//         .catch((error) => res.status(401).json(error));
// });


// GET BY NAME (books)

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

// GET BY NAME (authors)

// routes.get('/authors/:_id', function(req, res) {
//     res.contentType('application/json');
//     Author.find({ _id: req.params._id} )
//         .then((authors) => {
//             console.log();
//             if (authors.length === 0) {
//                 res.status(200).json('There are no authors');
//             }
//             else {
//                 res.status(200).json(authors);
//             }
//         })
//         .catch((error) => res.status(401).json(error));
// });
//
// // GET BY NAME (publishers)
//
// routes.get('/publishers/:_id', function(req, res) {
//     res.contentType('application/json');
//     Publisher.find({ _id: req.params._id} )
//         .then((publishers) => {
//             console.log();
//             if (publishers.length === 0) {
//                 res.status(200).json('There are no publishers');
//             }
//             else {
//                 res.status(200).json(publishers);
//             }
//         })
//         .catch((error) => res.status(401).json(error));
// });


// POST (books)

routes.post('/books', function(req, res) {
    Book.create(
        req.body,
        function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});

// POST (authors)

// routes.post('/authors', function(req, res) {
//     Author.create(
//         req.body,
//         function(err, result) {
//         if (err) return res.send(err);
//         res.send(result);
//         console.log(result);
//     });
// });
//
// // POST (publishers)
//
// routes.post('/publishers', function(req, res) {
//     Publisher.create(
//         req.body,
//         function(err, result) {
//         if (err) return res.send(err);
//         res.send(result);
//         console.log(result);
//     });
// });


// PUT (books)

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

// PUT (authors)

// routes.put('/authors/:_id', function(req, res) {
//     Author.findOneAndUpdate({_id: req.params._id},
//         req.body,
//         {
//           runValidators: true
//         },
//           function(err, result) {
//             if (err) return res.send(err);
//             res.send(result);
//         });
// });
//
// // PUT (publishers)
//
// routes.put('/publishers/:_id', function(req, res) {
//     Publisher.findOneAndUpdate({_id: req.params._id},
//         req.body,
//         {
//           runValidators: true
//         },
//           function(err, result) {
//             if (err) return res.send(err);
//             res.send(result);
//         });
// });


// DELETE (books)

routes.delete('/books/:_id', function(req, res) {
    Book.remove({_id: req.params._id},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});

// DELETE (authors)

// routes.delete('/authors/:_id', function(req, res) {
//     Author.remove({_id: req.params._id},
//         function (err, result) {
//             if (err) return res.send(err);
//             res.send(result);
//         });
// });
//
// // DELETE (publishers)
//
// routes.delete('/publishers/:_id', function(req, res) {
//     Publisher.remove({_id: req.params._id},
//         function (err, result) {
//             if (err) return res.send(err);
//             res.send(result);
//         });
// });

module.exports = routes;
