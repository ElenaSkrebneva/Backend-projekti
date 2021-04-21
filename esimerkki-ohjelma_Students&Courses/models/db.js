const mongoose = require('mongoose')
const address = 'mongodb://localhost:27017/mydatabase'
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(address)
var connection = mongoose.connection

connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + address);
});

// If the connection throws an error
connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
