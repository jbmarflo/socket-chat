var socket = io.connect('http://172.18.60.42:6677',{'forceNew':true});

socket.on('messages',function(data){
	console.log(data); 
	render(data);
});



//pintar el array al html
function render(data)
{
	//map para recorrer la informaciòn como for
	var html = data.map(function(message, index){
		//Interpolar, imprimit dentro de la cadena variables
		return (`<div class="message">
			<strong>${message.nickname}</strong>
			<p>${message.text}</p>
			</div> `);
	});

	var div_msg = document.getElementById('messages');
	div_msg.innerHTML = html;
	div_msg.scrollTop = div_msg.scrollHeight;
}

function addMessage(e)
{
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};

	document.getElementById('nickname').style.diplay = 'none';
	socket.emit('add-message', message);

	return false;
}