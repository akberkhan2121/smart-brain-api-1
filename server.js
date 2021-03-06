const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });


const app = express();
app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)} )

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})



// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, result) {
    // result == true
//});
//bcrypt.compare("veggies", hash, function(err, result) {
    // result == false
//});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('app is running on port ${process.env.PORT}');
})

/*

/ --> res = this is working
/signin --> POST request = success/fail
/register --> POST request = user
/profile/:userid --> GET request = user
/image --> PUT --> user

*/