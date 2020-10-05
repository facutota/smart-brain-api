const express = require('express');

const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  // connect to your own database here
  client: 'pg',
  connection: {
    host : '127.0.0.1:57272',
    user : 'facutota',
    password : '1991JonSam',
    database : 'smart-brain'
  },
  pool: { min: 0, max: 7}
});

/*db.select('*').from('table.users')
		.then(data => {
			console.log(data);
		}).catch(err =>
			console.log("error"));*/


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> { res.send('it is working') });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

app.listen(PORT || 3000 , ()=> {
  console.log('app is running on port ${PORT}');
})
