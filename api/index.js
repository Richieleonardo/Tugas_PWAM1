
const express = require("express");


//MANAGE PATH 
const path = require('path');
const app = express();
require('./database/db');
const port = process.env.PORT || 3000; //PORT WEBSITE

//MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname , '../styles'))); //TO DO

//view engine
app.set('view engine', 'js');

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//ROUTES
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html'))); //HOME
app.get('/game', (req,res) => res.render('game.html'));
app.get('/login', (req, res) => res.render('login.html'));

const UserRouter = require('./user');
app.use('/user', UserRouter);


module.exports = app;



