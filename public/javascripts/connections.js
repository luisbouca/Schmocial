
$(() => {

    //load all users into the page
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/api/users/",
        dataType: "json",
        success: function (data) {
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
          id : res[0],
          name : res[1],
          state : "request"
      }  
      
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/friends/new/",
        data: JSON.stringify({ userDest: $(this).attr('name'), userOrigin: amigo}),
        dataType: "json",
        success: function (data) {

        }
    })
}); 

//get friends request and display in page
$.ajax({
    type: "GET",
    contentType: "application/json",
    url: "http://localhost:3000/api/friends/get/"+currentUser,
    dataType: "json",
    success: function (data) {   
        $("#friendsContainer").html('')
var myvar = '<p>Friend Request:</p><span>'+data[0].friends[0].name+'</span>'+
'<div class="w3-row w3-opacity">'+
'    <div class="w3-half"><button class="w3-button w3-block w3-green w3-section" title="Accept"><i class="fa fa-check"></i></button></div>'+
'    <div class="w3-half"><button class="w3-button w3-block w3-red w3-section" title="Decline"><i class="fa fa-times"></i></button></div>'+
'</div>'; 
$("#friendsContainer").append(myvar)
    }
})






})