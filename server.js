const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        } 
    }
);
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('index.hbs', {
        welcome: 'Welcome one and all to HBS home!', 
        text: 'Lorem Ipsum dolor something something', 
        title: 'HBS Home',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page', 
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request!'
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});