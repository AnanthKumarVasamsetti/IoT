var net = require('net');
var stdin = process.openStdin();
var express = require('express');
var app = express();
var reset = true;
var browserData;

var HOST = 'localhost';
var PORT = 9898;

var client = new net.Socket();

client.connect(PORT,HOST,function(){
  console.log('Client connected to '+HOST+':'+PORT);
  stdin.addListener('data',function(data){
    client.write('From client1: '+data.toString());
    if(data.toString().trim() === 'exit'){
      client.destroy();
    }
  });
});

client.on('data',function(data){
  console.log(data.toString());
  browserData = data.toString();
  var resp;
  if(reset === true){
    var server = app.listen(9898,function () {

      var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
      reset = false;
    });
  }
  app.get('/index', function (req, res) {
    console.log('in app.get sending: '+browserData);
    res.send(browserData);
  });
  console.log('resp: '+resp);
});

client.on('close',function(data){
  console.log('Client closed :'+data);
});
