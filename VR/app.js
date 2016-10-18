var http = require('http');  
var express = require('express');
var Firebase = require('firebase');
var app =  module.exports = express();
var httpServer = http.createServer(app);  // app middleware
var io = require('socket.io')(httpServer);

app.set('views', __dirname + '/public'); // general config
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/404', function(req, res, next){
	next();// trigger a 404 since no other middleware will match /404 after this one, and we're not responding here
});

app.get('/403', function(req, res, next){// trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){// trigger a generic (500) error
  next(new Error('keyboard cat!'));
});

app.use(express.static(__dirname + '/public')); 


var myDataRef = new Firebase('https://ultrasonic4kiosk.firebaseio.com/distance');

if (!module.parent) {
  var io = require('socket.io').listen(app.listen(3000));
  console.log('Express started on port 3000');

  var os = require('os');
  var interfaces = os.networkInterfaces();
  var addresses = [];

  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              addresses.push(address.address);
          }
      }
  }


  var open = require('open');
      open('http://'+addresses[0]+':3000/display.html', function (err) {
        if (err) throw err;
        console.log('The user closed the browser');
      });
};

var _carData = {model:"",color:""};
var firstEntry = false, secondEntry = false, firstSpouseEntry = false, secondSpouseEntry = false, firstUserEmail, secondUserEmail,firstUserGender,secondUserGender;

io.sockets.on('connection', function (socket) {
  /* Adding user entry to data base */

  socket.on("allowSensor",function(data){
    io.sockets.emit('sensorAllowed', true);
  });

  socket.on("speakUp",function(data){
    io.sockets.emit('manualSpeak', true);
  });

  socket.on("userConnected", function(data){
    console.log("connectd");
    myDataRef.set("300");
     _carData = {model:"",color:""};
      //io.sockets.emit('clientDetected', true);
  });

  socket.on("userRegister", function(data){
    io.sockets.emit('userName', data);
  });

  socket.on("testDrive", function(data){
    io.sockets.emit('gotoTestDrive', _carData);
    var _st = setTimeout(function(){
      io.sockets.emit('testDriveData',_carData);
      var _st = setTimeout(function(){
        io.sockets.emit('resetAllPages',_carData);
      },25000);
    },3000);
  });

  socket.on("deviceUpdates",function(data){
    io.sockets.emit('deviceUpdateData', data);
  });
  socket.on("carInfo",function(data){
    io.sockets.emit('carInfoReceived', data);
  });
  socket.on("carSelected",function(data){
    _carData.model = data;
    io.sockets.emit('carSelectionDone', data);
  });

  socket.on("colorSelected",function(data){
    _carData.color = data;
    io.sockets.emit('colorSelectionDone', data);
  });
  
  socket.on("resetAll", function(data){
    io.sockets.emit('resetAllPages', data);
  });

  socket.on("accelerate", function(data){
    //console.log("accelerate "+data);
    io.sockets.emit('accelerateGo', data);
    console.log(data);
  });  

  socket.on("break", function(data){
    console.log("break "+data);
    io.sockets.emit('breakGo', data);
    
  });  

  socket.on("accident",function(data){
    io.sockets.emit('accidentHappened', data);
  })
  
  
});

