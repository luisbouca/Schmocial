$(() => {
    var socket = io.connect('http://localhost:3000');  
    socket.emit('join', {email: "user1@example.com"});

    $('#message').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            var foto = $('#fotoPerfil').attr('src')
            var nome = $('#userId').text() 
            socket.emit("news", { message: $("#message").val(), foto:foto,nome:nome })
        }
    });

    $("#sendMessage").click(function () { 
        
        var foto = $('#fotoPerfil').attr('src')
        var nome = $('#userId').text() 
        socket.emit("news", { message: $("#message").val(), foto:foto,nome:nome })
    });

    socket.on('news', function (data) {
        
var myvar = '<img class="w3-circle" src="'+data.foto+'" style="height:24px;width:24px;" alt="Avatar" /><span class="time-right" style="margin-left:1%;">'+data.nome+'</span>'+
'<p><font size="2">'+data.message+'</font></p>'; 
        $("#chatId").append(myvar)
        $("#message").val('')
        
    });
})

var personTalkingTo
function loadUser(id, name) {
    personTalkingTo=id
    $('#chatUserName').text(name)
} 