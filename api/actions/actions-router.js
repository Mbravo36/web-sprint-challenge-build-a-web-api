// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Action = require('./actions-model');
const {
    verifyId, 
    verifyPayload
} = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Action.get()
    .then(actions => {
        res.json(actions);
    })
    .catch(next)
});

router.get('/:id', verifyId, (req, res, next) => {
    res.json(req.action);
});

router.post('/', verifyPayload, (req, res, next) => {
    Action.insert(req.body)
    .then(newAction => {
        res.json(newAction);
    })
    .catch(next)
});

router.put('/:id', verifyId, verifyPayload, (req,res,next) => {
    Action.update(req.params.id, req.body)
    .then(updatedAction => {
        res.json(updatedAction);
    })
    .catch(next)
});

router.delete('/:id', verifyId, (req,res,next) => {
    Action.remove(req.params.id)
    .then(deletedAction => {
        res.json(deletedAction);
    })
    .catch(next)
});

router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = router;
