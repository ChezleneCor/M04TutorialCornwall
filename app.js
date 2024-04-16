const express = require('express');

// express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', { root: __dirname});
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Loream ipsum etc etc etc'},
        {title: 'Mario finds stars', snippet: 'Loream ipsum etc etc etc'},
        {title: 'How to defeat Bowser', snippet: 'Loream ipsum etc etc etc'},
    ]
    res.render('index', {title: 'Home', blogs});
});


app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname});
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a New Blog'});
});


// redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// 404
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname})
    res.status(404).render('404', {title: '404'});
});
