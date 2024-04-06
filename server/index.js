const express = require('express');
const Path = require('path');
require('dotenv').config();
const db = require('../database/index.js');
const router = require('./routes.js')
const axios =require('axios') ;

const app = express();

app.use(express.json());
app.use(express.static(Path.join(__dirname, '../dist')));


app.get('/players', (req, res) => {
  axios.get(`https://overfast-api.tekrop.fr/players?name=${req.query.name}`)
  .then((data) => {
    res.send(data.data)
  })
  .catch(() => {
    res.status(400).send('Error getting players')
  })
}
);

app.get('/players/:player_id/summary', (req, res) => {
  axios.get(`https://overfast-api.tekrop.fr/players/${req.params.player_id}/summary`)
  .then((data) => {
    res.send(data.data)
  })
  .catch(() => {
    res.status(400).send('Error getting player summary')
  })
}
);

app.get(`/players/:player_id/stats/summary`, (req, res) => {
  axios.get(`https://overfast-api.tekrop.fr/players/${req.params.player_id}/stats/summary?gamemode=${req.query.gamemode}&&platform=${req.query.platform}`)
  .then((data) => {
    res.send(data.data)
  })
  .catch(() => {
    res.status(400).send('Error getting player stats summary')
  })
}
);

app.get(`/heroes`, (req, res) => {
  axios.get(`https://overfast-api.tekrop.fr/heroes`)
  .then((data) => {
    res.send(data.data)
  })
  .catch(() => {
    res.status(400).send('Error getting hero')
  })
}
);

app.use('/statswatchUsers', router);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
}
);