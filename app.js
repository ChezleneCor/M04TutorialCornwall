const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const PORT = process.env.PORT || 3000;

// express app
const app = express();

// connect to mongo db
const db_URI = 'mongodb+srv://netninja:test1234@nodetuts.kzvqhwx.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=node-tuts'
mongoose.connect(db_URI)
  .then(result => app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  }))
  .catch(err => console.log(err));

//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan ('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

// blog routes
app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});
  

// redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});

// user: ccornwall2
// pass: PTSuwwxNgHiV7VhN
