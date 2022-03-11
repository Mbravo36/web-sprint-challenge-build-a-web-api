// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');
const { verifyId, verifyPayload, verifyUpdate } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
      res.json(projects);
    })
    .catch(next)
});

router.get('/:id', verifyId, (req, res, next) => {
    res.json(req.project);
});

router.post('/', verifyPayload, (req, res, next) => {
    Project.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(next)
});

router.put('/:id', verifyId, verifyPayload, verifyUpdate, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(updatedProject => {
      res.json(updatedProject);
    })
    .catch(next)
});

router.delete('/:id', verifyId, (req, res, next) => {
    Project.remove(req.params.id)
    .then(deletedProject => {
      res.json(deletedProject);
    })
    .catch(next)
});

router.get('/:id/actions', verifyId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
    .then(projectActions => {
      res.json(projectActions);
    })
    .catch(next)
});

router.use((err, req, res, next) => {
    res.status(500).json({ message: 'Error in Database'});
});

module.exports = router;