const assert = require('assert');
const Book = require('../model/book.model');

describe('Validating records', () => {
    it('requires a book name', () => {
        const book = new Book({
            title: undefined,
            length: 176,
            language: 'Dutch',
            isbn: '9025845274',
            imageURL: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/1/0/5/9200000046155016.jpg',
            author: {
                firstName: 'Paul',
                lastName: 'van Loon',
                dateOfBirth: '17/04/1955',
                authorImageURL: 'http://www.dolfjeweerwolfje.nl/wp-content/uploads/2015/04/foto_paul.png'
              },
            publisher: {
                name: 'Leopold',
                abbreviation: 'LPD',
                location: 'Amsterdam',
                kvkNumber: '33201458'
            }
        });
        const validationResult = book.validateSync();
        const { message } = validationResult.errors.title;

        assert(message === 'Title is required.')
    });


    it('disallows invalid records from being saved', (done) => {
        const book = new Book({
            title: 'Dolfje Weerwolfje',
            length: -1,
            language: 'Dutch',
            isbn: '9025845274',
            imageURL: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/1/0/5/9200000046155016.jpg',
            author: {
                firstName: 'Paul',
                lastName: 'van Loon',
                dateOfBirth: '17/04/1955',
                authorImageURL: 'http://www.dolfjeweerwolfje.nl/wp-content/uploads/2015/04/foto_paul.png'
              },
            publisher: {
                name: 'Leopold',
                abbreviation: 'LPD',
                location: 'Amsterdam',
                kvkNumber: '33201458'
            }
        });
        book.save()
            .catch((validationResult) => {
            const {message} = validationResult.errors.length;

            assert(message === 'Length must be greater than 0.');
            done();
        });
    });
});
