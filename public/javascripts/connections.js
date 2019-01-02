
$(() => {
 
//get friends request and display in page
var friends
$.ajax({
    type: "GET",
    contentType: "application/json",
    url: "http://localhost:3000/api/friends/get/"+$("#userId").attr('name'),
    dataType: "json",
    success: function (data) {   
        $("#friendsContainer").html('')
        if(data.length!=0){
            friends = data[0].friends  
var myvar = '<p>Friend Request:</p><span>'+data[0].friends[0].name+'</span>'+
'<div class="w3-row w3-opacity">'+
'    <div class="w3-half"><button class="w3-button w3-block w3-green w3-section decision" name="accept" value="'+data[0].friends[0].id+':'+data[0].friends[0].name+'" title="Accept"><i class="fa fa-check"></i></button></div>'+
'    <div class="w3-half"><button class="w3-button w3-block w3-red w3-section decision" name="dennied" value="'+data[0].friends[0].id+':'+data[0].friends[0].name+'" title="Decline"><i class="fa fa-times"></i></button></div>'+
'</div>'; 
}else{
    var myvar = '<p>Friend Request:</p><span>You have no friends request</span>'
}
$("#friendsContainer").append(myvar)
    }
})
var users 

    //load all users into the connections page
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/api/users/",
        dataType: "json",
        success: function (data) {
            users = data
                for(i=0;i<data.length;i++){
var myvar = 
'  <div class="row">'+
''+
'    <div class="shadow">'+
'      <div class="col-sm-12">'+
'        <div class="col-sm-2">'+
'          <img src="https://www.infrascan.net/demo/assets/img/avatar5.png" class="img-circle" width="60px">'+
'        </div>'+
'        <div class="col-sm-8">'+
'          <h4><a href="#">'+data[i].name+'</a></h4>'+
'          <p><a href="#">'+data[i].friends.length+' Friends</a></p>'+
'        </div>'+
'        <div class="col-sm-2">'+
'          <br>'+
'          <button class="close" name='+data[i]._id+'>Send Request Friend</button>'+
'        </div>'+
'      </div>'+
'      <div class="clearfix"></div>'+
'<hr>'
'    </div>'+
'  </div>'+
'</div>'; 
            $("#listConnections").append(myvar)
        }
        }
    })

    //Filter Users by name
      $("#search").keyup(function(){  
        $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/api/users/name/"+$("#search").val(),
        success: function (data) {
            $("#listConnections").html('')
            for(i=0;i<data.length;i++){
                var myvar = '<div class="container">'+
                '  <div class="top">'+
                '    <h2>Friend\'s List</h2>'+
                '  </div>'+
                '  <div class="row">'+
                ''+
                '    <div class="shadow">'+
                '      <div class="col-sm-12">'+
                '        <div class="col-sm-2">'+
                '          <img src="https://www.infrascan.net/demo/assets/img/avatar5.png" class="img-circle" width="60px">'+
                '        </div>'+
                '        <div class="col-sm-8">'+
                '          <h4><a href="#">'+data[i].name+'</a></h4>'+
                '          <p><a href="#">'+data[i].friends.length+' Friends</a></p>'+
                '        </div>'+
                '        <div class="col-sm-2">'+
                '          <br>'+
                '          <button class="close" name='+data[i]._id+'>Send Request Friend</button>'+
                '        </div>'+
                '      </div>'+
                '      <div class="clearfix"></div>'+
                '<hr>'
                '    </div>'+
                '  </div>'+
                '</div>'; 
                            $("#listConnections").append(myvar)
                        }
        }
    }) 
  });


 
  
//sends friendship request
  $('body').on('click', 'button.close', function() {
    var res = $("#search").attr('name').split(":");
      var amigo = {
          id : res[0],//user logado
          name : res[1],//nome user logado
          state : "request"
      }  
      
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/friends/new/",
        data: JSON.stringify({ userDest: $(this).attr('name'), userOrigin: amigo}),
        dataType: "json",
        success: function (data) {
alert("Pedido enviado com sucesso!!")
window.location.href = "http://localhost:3000/home"
        }
    })
}); 


//accepts/dennies friendship request
$('body').on('click', 'button.decision', function() {  
    var op = $(this).attr("name")
    var userToUpdate
    var infoFriend
    var url
    var user = $("#userId").attr('name') 
    var res  = $(this).val().split(":")
    if(op=="accept"){
        url = "http://localhost:3000/api/friends/accept/"
        userToUpdate = res[0]//id do user que queremos aceitar o pedido
        infoFriend = {
            id : user,//user logado
            name : $("#userId").text(),//nome user logado
            state : "accepted"
        }
    }else{ 
        userToUpdate = user
        infoFriend = res[0]
        url = "http://localhost:3000/api/friends/delete/"
    }
    alert(infoFriend.id)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify({user:userToUpdate, friend:infoFriend}),
        dataType: "json",
        success: function (data) { 
            window.location.href = "http://localhost:3000/home"
        }
    })
}); 

$('#friends').click(function () {
    var user = $("#search").attr('name').split(":"); 
    $("#listConnections").html('')
    for(j=0; j<users.length;j++){
        for(i=0;i<users[j].friends.length;i++){
            if(users[j].friends[i].id==user[0]){ 
                if(users[j].friends[i].state=="accepted"){
                var myvar = '<div class="container">'+
                '  <div class="top">'+
                '    <h2>Friend\'s List</h2>'+
                '  </div>'+
                '  <div class="row">'+
                ''+
                '    <div class="shadow">'+
                '      <div class="col-sm-12">'+
                '        <div class="col-sm-2">'+
                '          <img src="https://www.infrascan.net/demo/assets/img/avatar5.png" class="img-circle" width="60px">'+
                '        </div>'+
                '        <div class="col-sm-8">'+
                '          <h4><a href="#">'+users[j].name+'</a></h4>'+
                '          <p><a href="#">'+users[j].friends.length+' Friends</a></p>'+
                '        </div>'+
                '        <div class="col-sm-2">'+
                '          <br>'+ 
                '        </div>'+
                '      </div>'+
                '      <div class="clearfix"></div>'+
                '<hr>'
                '    </div>'+
                '  </div>'+
                '</div>'; 
                            $("#listConnections").append(myvar)
            }
        }
        } 
    }
});




})