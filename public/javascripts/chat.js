$(() => {
    var socket = io.connect('http://localhost:3000');  
    socket.emit('join', {email: "user1@example.com"});

    $('#message').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            if($("#message").val()!=""){
            var foto = $('#fotoPerfil').attr('src')
            var nome = $('#userId').text() 
            socket.emit("news", { message: $("#message").val(), foto:foto,nome:nome })
            } 
        }
    });

    socket.on('news', function (data) {
        var url
        var userOrigem = $('#userId').attr('name')
        var nome = $('#userId').text() 
        var foto = $('#fotoPerfil').attr('src')
        if(empty==0){
            url="http://localhost:3000/api/messages/"
        }else{
            url="http://localhost:3000/api/messages/update"
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: url,
            data: JSON.stringify({ mensagem: data.message, idUser1:userOrigem, idUser2:personTalkingTo, nome:nome, foto:foto}),
            dataType: "json",
            success: function () { 
                
            }
        }) 


        
var myvar = '<img class="w3-circle" src="'+data.foto+'" style="height:24px;width:24px;" alt="Avatar" /><span class="time-right" style="margin-left:1%;">'+data.nome+'</span>'+
'<p><font size="2">'+data.message+'</font></p>'; 
        $("#chatId").append(myvar)
        $("#message").val('')
        $("#chatId").animate({ scrollTop: $('#chatId').prop("scrollHeight")}, 0);
        
    });
})

var personTalkingTo
var nomeUserDestino
var empty
function loadUser(id, name) {
    $("#chatId").html('')
    var userOrigem = $('#userId').attr('name')
    nomeUserDestino = name
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/api/messages/"+userOrigem+'/'+id, 
        dataType: "json",
        success: function (data) {
            if(data.length!=0){
                empty = 1
                for(i=0; i<data[0].mensagens.length;i++){
                    var myvar = '<img class="w3-circle" src="'+data[0].mensagens[i].foto+'" style="height:24px;width:24px;" alt="Avatar" /><span class="time-right" style="margin-left:1%;">'+data[0].mensagens[i].nome+'</span>'+
                    '<p><font size="2">'+data[0].mensagens[i].texto+'</font></p>'; 
                    $("#chatId").append(myvar)
                }
            }else{
                empty=0
            } 
        }
    }) 

    personTalkingTo=id
    $('#chatUserName').text(name)
    $('#chatPop').css('display', 'block') 
} 