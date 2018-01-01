const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now} ${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  console.log(log)
  next()
})

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {
  // response.send('<h1>Hello express</h1>')
  response.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Hello, Andrew'
  })
})

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About page'
  })
})

app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
    pageTitle: 'Projects page',
    welcomeMessage: 'Portfolio page here'
  })
})

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to handle request'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
