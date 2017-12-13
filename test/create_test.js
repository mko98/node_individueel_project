const assert = require('assert');
const Book = require('../model/book.model');

describe('Creating records', () => {
    it('saves a book', (done) => {
      const book = new Book({
          title: 'Dolfje Weerwolfje',
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

        book.save()
            .then(() => {
                assert(!book.isNew);
                done();
            });
});
});
