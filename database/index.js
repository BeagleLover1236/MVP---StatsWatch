const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/statwatchUsers', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
}
);

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err)
}
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  player: {
    type: String,
    required: false
  }
});

let User = mongoose.model('User', userSchema);
User.createCollection()

module.exports = User;