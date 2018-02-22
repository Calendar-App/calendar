require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    controller = require('./controller');

const app = express();
app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);

}).catch(err => console.log('error of ' + err))

setTimeout(_ => {
    const db = app.get('db')
    console.log('the db should be accessible');
}, 2000)

//endpoints//
//GETS//
app.get('/api/users', controller.getUsers);


//DELETES//
app.delete('/api/deleteuser/:id', controller.deleteUser);
app.delete('/api/removeweek/:id/:week', controller.removeWeek);


const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 3005
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
