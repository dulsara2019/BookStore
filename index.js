const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const BookStore = require('./model/model')


//Initialize express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Connecting to DB
mongoose.connect('mongodb://localhost:27017/BookStore', {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
 console.log('connected to database')
}).catch((error) => {
 console.log(error)
})


//Adding 
app.post('/adding', (req, res) => {
 bookname= req.body.bookname,
 type = req.body.type,
 author = req.body.author,
 price = req.body.price
let newBookStore = new BookStore({
  bookname: bookname,
  type: type,
  author: author,
  price: price
 })
newBookStore.save().then((bookstore) => {
  res.send(bookstore)
 }).catch((err) => {
  console.log(error)
 })
})

//Reading
app.get('/:id', (req, res) =>{
    BookStore.findById(req.params.id, (err, user) =>{
     res.send(user)
    })
   })

 // Updating 
 app.post('/update/:id', (req, res) => {
	let bookstore = {}
	if (req.body.bookname) bookstore.bookname = req.body.bookname
	if (req.body.type) bookstore.type = req.body.type
	if (req.body.author) bookstore.author = req.body.author
	if (req.body.price) bookstore.price = req.body.price

	bookstore = { $set: bookstore }

	BookStore.update({_id: req.params.id}, bookstore).then(() => {
		res.send(bookstore)
	}).catch((err) => {
		console.log(error)
	})
})
   
// Deleting 

app.delete('/delete/:id', (req, res) => {
	BookStore.deleteOne({_id: req.params.id}).then(() => {
		res.send('user deleted')
	}).catch((err) => {
		console.log(error)
	})
})

// Initialize the sever
app.listen(3000, () => {
    console.log('sever listening on port:3000');
});