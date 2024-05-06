const { EventEmitter } = require('events');

const userEventEmitter = new EventEmitter();

userEventEmitter.on('user.created', (user) => {
  console.log('User created:', user);
});

userEventEmitter.on('user.login', (user) => {
  console.log('User logged in:', user);
});

module.exports = userEventEmitter;
