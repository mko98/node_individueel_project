const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
        },
    length: {
        type: Number,
        validate: {
          validator: (length) => length > 0,
          message: 'Length must be greater than 0.'
        },
        required: [true, 'Length is required.']

        },
    language: {
      type: String,
      required: [true, 'Language is required.']
        },
    isbn: {
      type: String,
      required: [true, 'ISBN is required.']
    },
    imageURL: {
      type: String,
      required: [true, 'Image URL is required.']
    },
    author: {
      firstName: {
        type: String,
        required: [true, 'First name is required.']
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required.']
      },
      dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required.']
      },
      authorImageURL: {
        type: String,
        required: [true, 'Image URL is required.']
      }
    },
    publisher: {
      name: {
        type: String,
        required: [true, 'Name is required.']
      },
      abbreviation: {
        type: String,
        required: [true, 'Abbreviation is required.']
      },
      location: {
        type: String,
        required: [true, 'location is required.']
      },
      kvkNumber: {
        type: String,
        required: [true, 'KVK number is required.']
      }
    }
});


const Book = mongoose.model('book', BookSchema);

module.exports = Book;
