const express = require('express');
const usersRouter = require('./users/users-router')
const morgan = require('morgan')

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use(express.json())

server.use('/api/users', usersRouter)
server.use(morgan('dev'))

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found
  `})
})

module.exports = server;
