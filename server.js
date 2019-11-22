const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
let port = 3000;


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

//log to server.log
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: | ${req.method} | ${req.url} | Status: ${req.body}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//   // next();
// });

app.use(express.static(__dirname + '/public'));

//Home page
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to the Home page',
    footNote: '... Powered by Lovelamp Systems!'
  });
});

//About
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.listen(port);
console.log(`Server is listen on ${port}`);