//forcerNew la coneccion de fuerce
var socket = io.connect('http://192.168.1.8:6677',{'forceNew':true});
//ngResource

angular.module("chat",[])
    .directive('schrollBottom', function () {
        return {
            scope: {
                schrollBottom: "="
            },
            link: function (scope, element) {
                scope.$watchCollection('schrollBottom', function (newValue) {
                    if (newValue)
                    {
                         var div_msg = document.getElementById('messagesBox');
                         var height = div_msg.scrollHeight;
                         div_msg.scrollTop = height;
                        // var height = element.scrollHeight;
                        // alert(height);
                        // $(element).scrollTop($(element)[0].scrollHeight);
                    }
                });
            }
        }
    })
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
	.controller("boxChat",["$scope", "$http", function(scope, http){
	var url_get = 'https://jsonplaceholder.typicode.com/comments';
    var url_post = 'https://jsonplaceholder.typicode.com/posts';
	scope.posts = [];
	scope.loading = true;

	//Get messages to put into box from service user
	//ALmacenar id en un storage o session
    http.get(url_get).then(
    	function mySucces(data){
            console.log(data);
            scope.posts = data;
            scope.loading = false;
		},
		function myError(err){
            scope.loading = false;
		}
	);

	//Promisse: peticios ascincronata
    scope.title_defualt = 'Servicio: ';
    scope.id_random = Math.floor((Math.random()*6)+1);
    scope.newMessage = {};


    scope.messages = [
		{
			"id": 1,
			"text": "Hola como estas"
		},
		{
			"id": 2,
			"text": "Bien xq"
		}
	];

    scope.sendMessage = function(){
    	if(scope.newMessage.text.replace(/^\s+|\s+$/g,'') != ''){
    		console.log(scope.newMessage);
            scope.messages.push(scope.newMessage);
            scope.newMessage = {};

            // var div_msg = document.getElementById('messagesBox');
            // var height = div_msg.scrollHeight + 100000;
            // div_msg.scrollTop = height;
		}
	};
	scope.newPost = {};
    //Post message into db
	scope.addMessage = function(){
		http.post(url_post,{id : scope.newMessage.id, text: scope.newMessage.text}).then(
			function mySuccess(data, status, header, config){
                scope.posts.push(scope.newPost);
				scope.newPost = {};
			},
			function myError(err, status, header, config){

			}
		);
	};

}]);




socket.on('messages',function(data){
	//console.log(data);
    render(data);
});



//pintar el array al html
function render(data)
{
	//map para recorrer la informaciòn como for
	var html = data.map(function(message, index){
		//Interpolar, imprimit dentro de la cadena variables
		return (`
			<div class="message">
			<strong>${message.nickname}</strong>
			<p>${message.text}</p>
			</div> 
		`);
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