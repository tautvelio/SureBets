const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const request = require('request');
const Promise = require('bluebird');
const scrapetopsport = require('./scrapetopsport');
const getpinnacle = require('./getpinnacle');
const insertData = require('./insertDataToDb');


//Connect to database
mongoose.connect(config.database, { useMongoClient: true });

//On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ config.database);
});

//On error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});


const app = express();

const users =  require('./routes/users');


//Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('/bets', function (req, res) {

    Promise.all([getpinnacle(), scrapetopsport()]).then(results => {
            let pinnResults = results[0];
            let topsportResults = results[1];

            let pinnFixtures = pinnResults[0].pinnFixtures;
            let pinnOdds = pinnResults[1].pinnOdds;

            let mergedPinns = [];

            pinnOdds.forEach (x => {
                let pinnFixture = pinnFixtures.find(f => f.id === x.id);

                if (pinnFixture)
                    mergedPinns.push(Object.assign({}, x, pinnFixture));
            });

            res.send("mergedPinns: " + mergedPinns.length + " Fixtures: " + pinnFixtures.length + " Odds: " 
                + pinnOdds.length + JSON.stringify(mergedPinns) + JSON.stringify(topsportResults));

            insertData(mergedPinns,topsportResults);
        });       
});    

app.listen(port, () => {
    console.log('Server started on port'+port);
    });