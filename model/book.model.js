const mongoose = require('mongoose');
const AuthorSchema = require('./author.model');
const PublisherSchema = require('./publisher.model');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
        },
    length: {
        type: Number,
        required: true
        },
    language: {
      type: String,
      required: true
        },
    imageURL: {
      type: String
    },
    author: {
      type: Schema.Types.Object,
      ref: 'author',
      required: true
    },
    publisher: {
      type: Schema.Types.Object,
      ref: 'publisher'
    }
});


const Book = mongoose.model('book', BookSchema);

const book = new Book({
    title: 'TestBook',
    length: 2,
    language: 'English',
    imageURL: 'http://s3.amazonaws.com/libapps/accounts/16833/images/boek-bruin.png',
    author: [{
        firstName: 'TestAuthorFirstName',
        lastName: 'TestAuthorLastName',
        birthYear: 1982
      }],
    publisher: [{
        name: 'TestPublisher'
    }]
}); book.save();
console.log(book);


module.exports = Book;
