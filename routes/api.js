const express = require('express');
const router = express.Router();
const books = require('../db/book_content')

let booksDirectory = books;

// Get the list of books from db
router.get('/books', (req, res) => {
    res.send(booksDirectory)
})

// Get a particular book with id/isbn
router.get('/books/:id', (req, res) => {
    const { id } = req.params;

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('This book is not available.');

    res.send(book);
})

// Add a book
router.post('/books', (req, res) => {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        shortDescription,
        longDescription,
        status,
        author,
        categories
    } = req.body;

    const bookEist = booksDirectory.find(b => b.isbn === isbn);
    if (bookEist) return res.send('This book already exist');

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        shortDescription,
        longDescription,
        status,
        author,
        categories
    };
    booksDirectory.push(book);
    res.send(book);
})

// Update a book
router.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const {
        title,
        pageCount,
        publishedDate,
        shortDescription,
        longDescription,
        status,
        author,
        categories
    } = req.body;

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.send('This book does not exist');

    const updatedField = (val, prev) => !val ? prev : val;
    
    const updatedBook = {
        ...book,
        title: updatedField(title, book.title),
        pageCount: updatedField(pageCount, book.pageCount),
        publishedDate: updatedField(publishedDate, book.publishedDate),
        shortDescription: updatedField(shortDescription, book.shortDescription),
        longDescription: updatedField(longDescription, book.longDescription),
        status: updatedField(status, book.status),
        author: updatedField(author, book.author),
        categories: updatedField(categories, book.categories),
    }

    const bookIndex = booksDirectory.findIndex(b => b.isbn === id);
    booksDirectory.splice(bookIndex, 1, updatedBook);

    res.send(updatedBook);
})

// Delete a book
router.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('This Book does not exist');

    booksDirectory = booksDirectory.filter(b => b.isbn !== id)

    res.send('Success')
})

module.exports = router