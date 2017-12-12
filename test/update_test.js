const assert = require('assert');
const Book = require('../model/book.model');

describe('Updating records', () => {
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

   function assertName(operation, done) {
       operation
           .then(() => Book.find({}))
           .then((books) => {
               assert(books.length === 1);
               assert(books[0].title === 'De griezelbus');
               done();
           });
   }

   it('instance type using set n save', (done) => {
       dolfje.set('title', 'De griezelbus');
       assertName(dolfje.save(), done);
   });

   it('A model instance can update', (done) => {
       assertName(dolfje.update({title: 'De griezelbus'}), done);
   });

    it('A model class can update', (done) => {
        assertName(Book.update({title: 'Dolfje Weerwolfje'}, {title: 'De griezelbus'}), done)
    });

    it('A model class can update on record', (done) => {
        assertName(Book.findOneAndUpdate({title: 'Dolfje Weerwolfje'}, {title: 'De griezelbus'}), done);
    });

    it('A model class can find a record  with an Id and update', (done) => {
        assertName(Book.findByIdAndUpdate(dolfje._id, {title: 'De griezelbus'}), done)
    });

});
