$(() => {
    var socket = io.connect('http://localhost:3000');  
    socket.emit('join', {email: "user1@example.com"});

    $('#message').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            if($("#message").val()!=""){
            var foto = $('#fotoPerfil').attr('src')
            var nome = $('#userId').text() 
            var url
            var userOrigem = $('#userId').attr('name') 
            if(empty==0){
                url="http://localhost:3000/api/messages/"
            }else{
                url="http://localhost:3000/api/messages/update"
            }
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: url,
                data: JSON.stringify({ mensagem: $("#message").val(), idUser1:userOrigem, idUser2:personTalkingTo, nome:nome, foto:foto}),
                dataType: "json",
                success: function () { 
                    
                }
            }) 
            socket.emit("news", { message: $("#message").val(), foto:foto,nome:nome, idUser1:userOrigem, idUser2:personTalkingTo })
            empty=1
            } 
        }
    });

    socket.on('news', function (data) { 
        if(data.idUser2==$('#userId').attr('name')||data.idUser1==$('#userId').attr('name')){
            var myvar = '<img class="w3-circle" src="'+data.foto+'" style="height:24px;width:24px;" alt="Avatar" /><span class="time-right" style="margin-left:1%;">'+data.nome+'</span>'+
            '<p><font size="2">'+data.message+'</font></p>'; 
                    $("#chatId").append(myvar)
                    $("#message").val('')
                    $("#chatId").animate({ scrollTop: $('#chatId').prop("scrollHeight")}, 0);
                    $("#message").attr("autofocus", true)
    $('#chatPop').css('display', 'block') 
    personTalkingTo=data.idUser1
        }
        
    });
})

var personTalkingTo
var nomeUserDestino
var empty
function loadUser(id, name) {
    $("#chatId").html('') 
    nomeUserDestino = name
    loadDataFromDB(id)

    personTalkingTo=id
    $('#chatUserName').text(name)
    $('#chatPop').css('display', 'block') 
} 


function loadDataFromDB(id) {  
    var userOrigem = $('#userId').attr('name') 
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
                $("#chatId").animate({ scrollTop: $('#chatId').prop("scrollHeight")}, 0);
            }else{
                empty=0
            } 
        }
    })  
} 