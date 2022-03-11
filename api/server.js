const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionRouter = require('./actions/actions-router');
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router');
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectsRouter);


module.exports = server;
