const assert = require('assert');
const Book = require('../model/book.model');
describe('Reading users out of the database', () => {
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

   it('finds all users with a title of dolfje', (done) => {
    Book.find({title: 'Dolfje Weerwolfje'})
        .then((books) => {
        assert(books[0]._id.toString() === dolfje._id.toString());
        done();
        });
   }) ;

   it('find a user with particular id', (done) => {
       Book.findOne({ _id: dolfje._id} )
           .then((book) => {
           assert(book.title === 'Dolfje Weerwolfje');
           done();
           });
   });
});
