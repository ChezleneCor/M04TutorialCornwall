const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// connect to mongo db
const db_URI = 'mongodb+srv://netninja:test1234@nodetuts.kzvqhwx.mongodb.net/?retryWrites=true&w=majority&appName=node-tuts'
mongoose.connect(db_URI)
    .then((result) => {
        console.log('Connected to db')})
    .catch((err) => console.log(err));


// express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan ('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) =>{
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/single-blog', (req, res) => {
    Blog.findById('66284a6f06b723327f9a7164')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
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

// user: ccornwall2
// pass: PTSuwwxNgHiV7VhN
