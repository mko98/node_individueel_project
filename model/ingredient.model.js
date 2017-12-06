const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
        },
    amount: {
        type: String,
        required: true
    }
});

const Ingredient = mongoose.model('ingredient', IngredientSchema);

const ingredient = new Ingredient({
    name: 'Broodje',
    amount: 2
}); ingredient.save();
console.log(ingredient);

module.exports = Ingredient;
