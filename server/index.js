var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Cargar una vista estatica por defecto "middleware" que nos da express
app.use(express.static('client'));

//Crear una ruta con express
app.get('/hola-mundo', function(req,res){
	res.status(200).send("Hola mundo desde una ruta");
});

//Abrir una coneccion al socket
//on lanzar eventos
//Connecetion recibe la conexiones de los clientes
var message = [{
	id:1,
	text: 'Bienvenido al chat',
	nickname: 'Bot'
}];
io.on('connection',function(socket){
	console.log("EL cliente con IP: "+socket.handshake.address+" Se ha conectado...");
	socket.emit('messages',message);

	//recibir elemento, guardar en el servidor y emitirla al cliente

	//push añadir dato al array. Persiste de forma temportal mientras el socket este abierto
	socket.on('add-message', function(data){
		message.push(data);
		//acabe de añadir elemento al array, amito a todos los clientes conectados
		io.sockets.emit('messages',message);
	});

});

//COnectar socket io, tener un conecciòn abierto
server.listen(6677, function(){
	console.log("server work!");
});
