const User = require('../../database');

module.exports = {
  getUser: function(entry) {
    return User.findOne(entry);
  },
  postUser: function(entry) {
    console.log(entry);
    return User.create({email: entry.email, password: entry.password, username: entry.username, player: entry.player});
  },
  updatePlayer: function(entry) {
    console.log(entry)
    return User.findOneAndUpdate({
      email: entry.email
    }, {
      $set: {
        player: entry.player
      }
    });
  }
};