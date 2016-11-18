const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n');
    next();
});

// Maintenance mode
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });


app.use(express.static(__dirname +'/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/',(req, res)=>{
    //res.send('Hello Express');
        res.render('home.hbs', {
            welcomeText: 'Welcome to the dummy site',
            pageTitle: 'Home'
        });
        
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Us'

    });
});

app.get('/bad',(req, res)=>{
    //res.send('Hello Express');
    res.send({
        errorMessage: '<h1>404</h1>: The page rquested do not exists.',
        
    });
});

app.listen(3000, ()=>{
    console.log('App is running on localhost port no. 3000');
})