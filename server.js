const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     page: {
//       title: 'Maintenance',
//       message: 'The site is currently down for maintenance'
//     }
//   });
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    page: {
      title: 'Home',
      welcomeMessage: 'Welcome to my webserver'
    }
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    page: {
      title: 'About Page'
    }
  })
});

app.get('/bad', (req, res) => {
  res.send({
    status: 404,
    message: 'Unable to handle request'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    page: {
      title: 'Projects Page',
      message: 'Welcome to my projects page'
    }
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});