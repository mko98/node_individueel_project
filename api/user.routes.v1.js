//
// ./api/v1/user.routes.v1.js
//
var express    = require('express');
var routes     = express.Router();
var mongodb    = require('../config/mongo.db');
var Recipe     = require('../model/recipe.model');
var Ingredient = require('../model/ingredient.model');


// GET ALL (RECIPES)

routes.get('/recipes', function(req, res) {
    res.contentType('application/json');
    Recipe.find({})
        .then((recipes) => {
            console.log(recipes.ingredients);
            if (recipes.length     === 0) {
                res.status(200).json('There are no recipes');
            }
            else {
                res.status(200).json(recipes);
            }
        })
        .catch((error) => res.status(401).json(error));
});

// GET ALL (INGREDIENTS)

routes.get('/ingredients', function(req, res) {
    res.contentType('application/json');
    Ingredient.find({})
        .then((ingredients) => {
        if (ingredients.length === 0) {
            res.status(200).json('There are no ingredients');
        }
        else {
            res.status(200).json(ingredients);
        }
    })
        .catch((error) => res.status(401).json(error));
});


// GET BY NAME (RECIPES)

routes.get('/recipes/:_id', function(req, res) {
    res.contentType('application/json');
    Recipe.find({ _id: req.params._id} )
        .then((recipes) => {
            console.log(recipes);
            if (recipes.length     === 0) {
                res.status(200).json('There are no recipes');
            }
            else {
                res.status(200).json(recipes);
            }
        })
        .catch((error) => res.status(401).json(error));
});

// GET BY NAME (INGREDIENTS)

routes.get('/ingredients/:_id', function(req, res) {
    res.contentType('application/json');
    Ingredient.find({ _id: req.params._id} )
        .then((ingredients) => {
            console.log(ingredients);
            if (ingredients.length === 0) {
                res.status(200).json('There are no ingredients');
            }
            else {
                res.status(200).json(ingredients);
            }
        })
        .catch((error) => res.status(401).json(error));
});


// POST (RECIPES)

routes.post('/recipes', function(req, res) {
    Recipe.create({
        name: req.body.name,
        imageURL: req.body.imageURL,
        description: req.body.description,
        ingredients: req.body.ingredients
    }, function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});

// POST (INGREDIENTS)

routes.post('/ingredients', function(req, res) {
    Ingredient.create({
        name: req.body.name,
        amount: req.body.amount,
    }, function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    });
});


// PUT (RECIPES)

routes.put('/recipes/:_id', function(req, res) {
    console.log(req);
    Recipe.findOneAndUpdate({_id: req.params._id}, req.body,
            {
                runValidators: true
            },
            function(err, result) {
              if (err) return res.send(err);
              res.send(result);
        });
});

// PUT (INGREDIENTS)

routes.put('/ingredients/:_id', function(req, res) {
    Ingredient.findOneAndUpdate({_id: req.params._id},
        {
            name: req.body.name,
            amount: req.body.amount,
        },
        {
          runValidators: true
        },
          function(err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});


// DELETE (RECIPES)

routes.delete('/recipes/:_id', function(req, res) {
    Recipe.remove({_id: req.params._id},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});

// DELETE (INGREDIENTS)

routes.delete('/ingredients/:_id', function(req, res) {
    Ingredient.remove({_id: req.params._id},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});

module.exports = routes;
