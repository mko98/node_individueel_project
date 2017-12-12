const assert = require('assert');
const Book = require('../model/book.model');

describe('Deleting a book', () => {
    let dolfje;
   beforeEach((done) => {
       dolfje = new Book({
           title: 'Dolfje Weerwolfje',
           length: 176,
           language: 'Dutch',
           isbn: '9025845274',
           imageURL: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/1/0/5/9200000046155016.jpg',
           author: {
               firstName: 'Paul',
               lastName: 'van Loon',
               dateOfBirth: '17/04/1955',
               imageURL: 'http://www.dolfjeweerwolfje.nl/wp-content/uploads/2015/04/foto_paul.png'
             },
           publisher: {
               name: 'Leopold',
               abbreviation: 'LPD',
               location: 'Amsterdam',
               kvkNumber: '33201458'
           }
       });
       dolfje.save()
           .then(() => done());
   });


   it('model instance remove', (done) => {
        dolfje.remove()
            .then(() => Book.findOne({title: 'Dolfje Weerwolfje'}))
            .then((book) => {
            assert(book === null);
            done();
            })
   });

    it('class method remove', (done) => {
        // Remove a bunch of records with a given criteria
        Book.remove({ title: 'Dolfje Weerwolfje' })
            .then(() => Book.findOne({title: 'Dolfje Weerwolfje'}))
            .then((book) => {
                assert(book === null);
                done();
        });
    });

    it('class method findOneAndRemove', (done) => {
        Book.findOneAndRemove({title: 'Dolfje Weerwolfje'}).then(() => Book.findOne({title: 'Dolfje Weerwolfje'}))
            .then((book) => {
                assert(book === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        Book.findByIdAndRemove(dolfje._id)
            .then(() => Book.findOne({title: 'Dolfje Weerwolfje'}))
            .then((book) => {
                assert(book === null);
                done();
            });
    });
});
