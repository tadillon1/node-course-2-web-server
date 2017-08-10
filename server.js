const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

// serve up html file


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log (log);
  fs.appendFile('server.log', log + '/n', (err) => {
    if (err) {
      console.log('Unable to log to server.log');
    }

  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//app.get is an api handler
//'/' - current directory, 'req' - request, 'res' - response
//req - information about the request coming in...
//res - bunch of methods via express
app.get('/', (req, res) => {
  res.render('homepage.hbs', {
    pageTitle: 'Welcome to the Home Page!',
    welcomeMessage: 'This is the homepage body',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling requet!'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
}); //listening port
