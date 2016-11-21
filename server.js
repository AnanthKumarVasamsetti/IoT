var net = require('net');
var stdin = process.openStdin();

var HOST = 'localhost';
var PORT = 9898;

net.createServer(function(sock){

  sock.on('data',function(data){
    console.log(data.toString());
  });

  sock.on('close',function(data){
    console.log('Connection closed :'+data);
  });

  stdin.addListener('data',function(data){
    sock.write(data.toString());
  });
}).listen(PORT,HOST);

console.log('====================== server ======================');
console.log('Server started running at '+HOST+':'+PORT);
