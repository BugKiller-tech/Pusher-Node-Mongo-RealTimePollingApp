const express = require('express');
const Pusher = require('pusher');



const router = express.Router();



var pusher = new Pusher({
  appId: '465192',
  key: '7da030596ec30481026d',
  secret: '79cbf77260326eed5fec',
  cluster: 'us2',
  encrypted: true
});




router.get('/', (req, res) => {
  res.send('POLL');
});

router.post('/', (req, res) => {
  //channel, event
  pusher.trigger('os-poll', 'os-vote', {
    points: 1,
    os: req.body.os
  }, (err) => {
    console.log(err)
  });
  console.log('pushing message into pusher');
  res.json({
    success: true,
    message: 'Thanks for voting..'
  })
  
});

module.exports = router;