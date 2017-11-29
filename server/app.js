const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const users =  require('./routes/users');
const bets =  require('./routes/bets');
const basketballbets =  require('./routes/basketballBets');
const hockeybets = require('./routes/hockeyBets');


mongoose.connect(config.database, { useMongoClient: true });


mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

const app = express();

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/bets', bets);
app.use('/basketballbets', basketballbets);
app.use('/hockeybets', hockeybets);


//Index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server started on port'+port);
    });
