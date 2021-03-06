const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res) => {
  Book.find({})
    .then(books => {
      res.render('books', { books });
    })
    .catch(err => {
      console.error('Error while finding the books', err);
    });
});

router.get('/books/add', (req, res) => {
  res.render('book-add');
});

router.post('/books/add', (req, res) => {
  const { title, author, description, rating } = req.body;
  Book.create({ title, author, description, rating })
    .then(() => {
      console.log('Book successfully created');
      res.redirect('/books');
    })
    .catch(err => {
      console.error('Error while creating book', err);
    });
});

router.get('/books/:bookId', (req, res) => {
  const _id = req.params.bookId;
  Book.findOne({ _id })
    .then(book => {
      res.render('book-detail', { book });
    })
    .catch(err => {
      console.error('Error while retrieving book with id ' + _id, err);
    });
});

module.exports = router;
