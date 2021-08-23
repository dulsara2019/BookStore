const mongoose = require('mongoose');

// Schema for BookStore
const BookStoreSchema = mongoose.Schema({
    bookname: {
     type: String,
     required: true
    },
    type: {
     type: String,
     required: true
    },
    author: {
     type: String,
     required: true
    },
    price: {
     type: Number,
     required: true
    }
   })
   //Creating the collection BookStore
   const BookStore = mongoose.model('BookStore', BookStoreSchema)
   module.exports = BookStore;
  