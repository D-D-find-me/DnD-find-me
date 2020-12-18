require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const userCtrl = require('./controllers/userController');

const app = express();

const path = require('path');

app.use(express.static(`${__dirname}/../build`));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log(`db is up, m'lord`)
}).catch(err => console.log(err));

// ENDPOINTS
app.post('/auth/login', userCtrl.login);
app.post('/auth/register', userCtrl.register);
app.post('/auth/logout', userCtrl.logout);
app.put('/api/adventurer', userCtrl.editAdventurer);
app.get('/api/adventurer', userCtrl.getAdventurer);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

app.listen(SERVER_PORT, () => console.log(`server is running in ${SERVER_PORT}`));