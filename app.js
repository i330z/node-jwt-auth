const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://izzaz:izzaz123@cluster0.5mamo.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000);
    console.log('db connected')
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// example how to set cookie using cookie parser

// app.get('/set-cookie', (req,res) => {
//   res.cookie('new-user', true);
//   res.send('cookie-set');
// })