const express = require('express');
const router = express.Router();
const controllers = require('./controllers/users.js');

router.get('/:users', controllers.getUsers);
router.post('/users', controllers.postUsers);
router.put('/users/update', controllers.updatePlayer);

module.exports = router;