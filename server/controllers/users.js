const models = require('../models/users.js');

module.exports = {
  getUsers: function(req, res) {
    models.getUser({email: req.params.users})
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400).send(err));
  },
  postUsers: function(req, res) {
    models.postUser(req.body)
      .then(() => {
        res.status(201)
      })
      .catch(err => res.status(400).send(err));
  },
  updatePlayer: function(req, res) {
    console.log(req.body);
    models.updatePlayer(req.body)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.status(400).send(err); 
      });
  }

};
