// add middlewares here related to projects
const Project = require('./projects-model');

const verifyId = (req, res, next) => {
    Project.get(req.params.id)
    .then(project => {
      if (!project) {
        res.status(404).json({ message: `Unable to find Project with the given id ${req.params.id}`});
      } else {
          req.project = project;
          next();
      }
    })
    .catch(err => console.log(err))
}

const verifyPayload = (req, res, next) => {
    const { name, description } = req.body;

    if (!name || !name.trim()|| !description || !description.trim()) {
      res.status(400).json({ message: 'Name and description is required' });
    } else {
      next();
    }
}

const verifyUpdate = (req, res, next) => {
    const { name, description } = req.body;

    if (req.project.name === name && req.project.description === description) {
      res.status(400).json(req.body)
      next();
    } 
    else {
      next();
    }
}

module.exports = {
    verifyId,
    verifyPayload,
    verifyUpdate
}