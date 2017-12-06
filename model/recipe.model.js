const mongoose = require('mongoose');
const IngredientSchema = require('./ingredient.model');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        type: Schema.Types.Object,
        ref: 'ingredient'
    }]
});
        // ingredients: [IngredientSchema]

        // ingredients: [{
        //     ingredientname: String,
        //     amount: Number
        // }]

const Recipe = mongoose.model('recipe', RecipeSchema);

// Add a 'dummy' recipe (every time you require this file!)
const recipe = new Recipe({
    name: 'Broodje Frikandel',
    imageURL: 'testurlcom',
    description: 'beschrijvingtest',
    ingredients: [
        {
            name: "DummyNameIngredient1",
            amount: 20
        },
        {
            name: "DummyNameIngredient2",
            amount: 6
        }
    ]
}); recipe.save();
console.log(recipe);

module.exports = Recipe;