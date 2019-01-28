var currentUser
function getUser(user) {
    currentUser=user
  }
  //Filtro de posts por hashtags
var hashs = new Array()//array onde irão estar as hashtags
function filterHash(teste) {
    var url
    var tipo
    var dados
    if($('#'+''+teste+'').attr('name')=='stand-by'){
        hashs.push(teste)
        $('#'+''+teste+'').attr('name', 'checked'); 
        $('#'+''+teste+'').css("background-color", "red");
    }else if($('#'+''+teste+'').attr('name')=='checked'){ 
        for (var i=hashs.length-1; i>=0; i--) {
            if (hashs[i] === teste) {
                hashs.splice(i, 1); 
                $('#'+''+teste+'').attr('name', 'stand-by'); 
                $('#'+''+teste+'').css("background-color", "");
            }}
    }
    if(hashs.length>0){
        url = "http://localhost:3000/api/posts/filter/"
        tipo = "POST"
        dados=JSON.stringify({ hashtags: hashs })
    }else{
        url = "http://localhost:3000/api/posts/"
        tipo = "GET"
        dados=""
    }
    $.ajax({
        url: url,
        contentType: "application/json",
        type: tipo,
        data: dados,
        dataType: "json",
        success: function (data) {
            $('#conteudoPosts').html('')
            for (i = 0; i < data.length; i++) {
                var myvar = ""
                var pic
                var comments = "" 
                var cont = 0
                var voto
                if (data[i].state == "public") {
                    if (data[i].picture) {
                        pic = '<img class="w3-margin-bottom" src=' + 'images/' + data[i].picture + ' style="width:100%;" />'
                    } else {
                        pic = ""
                    }
                    if (data[i].comments) {
                        for (j = 0; j < data[i].comments.length; j++) {
                            if(data[i].comments[j].picture){
                                comments = comments + '<img id="image'+data[i].comments[j]._id+'" class="w3-circle" src="images/profile/'+data[i].comments[j].picture+'" style="height:48px;width:48px;display:inline-block;margin-right:10px;" alt="Avatar" />'  
                            }else{ 
                                comments = comments + '<img id="image'+data[i].comments[j]._id+'" class="w3-circle" src="/w3images/avatar3.png" style="height:48px;width:48px;display:inline-block;margin-right:10px;" alt="Avatar" />'                               
                            }
                            if(data[i].comments[j].user==(currentUser+':'+$('#userId').text())){
                                comments = comments + '<p id="comment'+data[i].comments[j]._id+'" class="w3-padding w3-round-large w3-light-grey" style="display:inline-block;width:90%;"> <span style="color:blue; font-weight: bold;">'+ data[i].comments[j].user.split(":")[1] + '</span><span style="margin-left:1%;">'+ data[i].comments[j].message +'</span><i class="fa fa-trash fa-lg" style="float:right;" onclick="removeComent('+'\''+data[i].comments[j]._id+'\','+'\''+data[i]._id+'\')"></i></p>'
                            }else{ 
                                comments = comments + '<p id="comment'+data[i].comments[j]._id+'" class="w3-padding w3-round-large w3-light-grey" style="display:inline-block;width:90%;"> <span style="color:blue; font-weight: bold;">'+ data[i].comments[j].user.split(":")[1] + '</span><span style="margin-left:1%;">'+ data[i].comments[j].message +'</span></p>'                       
                            }
                             }
                    } else {
                        comments = ""
                    }
                    if(data[i].votes){
                        for (l = 0; l < data[i].votes.length; l++) {
                            if(data[i].votes[l]==currentUser){
                                cont = 1
                            } 
                            }
                        if(cont==1){
                            voto = '<button class="w3-button" id="downVoteBtn'+data[i]._id+'" onclick="voteDown('+'\''+currentUser+'\','+'\''+data[i]._id+'\');" type="button"><i class="fa fa-chevron-down" id="downVote'+data[i]._id+'"> Downvote</i></button>'
                        }else{
                            voto = '<button class="w3-button" id="upVoteBtn'+data[i]._id+'" onclick="voteFunc('+'\''+currentUser+'\','+'\''+data[i]._id+'\');" type="button"><i class="fa fa-chevron-up" id="upVote'+data[i]._id+'"> Upvote</i></button>'
                        }
                    } 
                    myvar = myvar + '<div class="w3-container w3-card w3-black w3-round w3-margin"><br/>' +
                        '<img class="w3-left w3-circle w3-margin-right" style="width:60px;" src="/w3images/avatar3.png" alt="Avatar" /><span class="w3-right w3-opacity">32 min</span>' +
                        '    <h4>'+data[i].owner.split(":")[1]+'</h4><br/>' +
                        '    <hr class="w3-clear" />' +
                        '    <p>' + data[i].content + '</p>' + pic + voto + '<div class="w3-card w3-black" style="display: inline;">'+
                        '    <p class="w3-margin-bottom" id=' + data[i]._id + ' style="display: inline;">'+data[i].votes.length+' </p><i class="far fa-thumbs-up" style="font-size:24px; padding: 5px; display: inline;"></i></div>'+
                        '    <div class="w3-container w3-card commentSection" name=' + data[i]._id + '>' +
                        comments + '</div>'+
                        '<textarea class="w3-padding w3-round-large w3-light-grey"  id="NewComment" name=' + data[i]._id + ' cols="78%" rows="1" placeholder="Enter a new comment"></textarea>' +
                        '</div>';
                }
                $('#conteudoPosts').append(myvar);
            }

        }
    });
}

function fuck(id){
    var estado = $('#currentState'+id +' option:selected' ).val()
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/posts/update",
        data: JSON.stringify({ id: id, estado:estado}),
        dataType: "json",
        success: function () {
            window.location.href = "http://localhost:3000/home"
        }
    }) 
}


//Apagar um post
function erasePost(id){
    alert(id)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/posts/remove",
        data: JSON.stringify({ id: id}),
        dataType: "json",
        success: function () {
            window.location.href = "http://localhost:3000/home"
        }
    }) 
}

//Iserção de voto
function voteFunc(user,post){  
        var result = $('#'+''+post+'').text()
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/api/posts/vote",
            data: JSON.stringify({ user: user, post: post }),
            dataType: "json",
            success: function () {
                $("#upVote"+post).text(' Downvote')
                $("#upVoteBtn"+post).attr("onclick","voteDown('"+user+"','"+post+"')");
                $("#upVoteBtn"+post).attr("id","downVoteBtn"+post); 
                $('#upVote'+post).attr({
                    id: 'downVote'+post,
                    class: 'fa fa-chevron-down'
                });
                }
        }) 
        $('#'+''+post+'').text((parseInt(result)+1)) 
}

//Remoção de voto
function voteDown(user,post){  
    var result = $('#'+''+post+'').text()
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/posts/vote/remove",
        data: JSON.stringify({ user: user, post: post }),
        dataType: "json",
        success: function () {
            $("#downVote"+post).text(' Upvote')
            $("#downVoteBtn"+post).attr("onclick","voteFunc('"+user+"','"+post+"')");
            $("#downVoteBtn"+post).attr("id","upVoteBtn"+post); 
            $('#downVote'+post).attr({
                id: 'upVote'+post,
                class: 'fa fa-chevron-up'
              });
        }
    }) 
    $('#'+''+post+'').text((parseInt(result)-1)) 
}



//Remoção de comentario
function removeComent(idComment, idPost){   
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/posts/comment/remove",
        data: JSON.stringify({ post: idPost, comment:idComment}),
        dataType: "json",
        success: function () { 
            $('#comment'+idComment).remove()
            $('#image'+idComment).remove()
        }
    }) 
}
 
$(() => {
    $('#hashtags').load('http://localhost:3000/posts/hashtags');

    $('#addHashtag').click(function () {
        $('#hashtagContainer').append('<input class="w3-border-0 w3-padding w3-round-large" style="width:26%; margin-left:1%" type="text" name="hashtags[]" placeholder="Insert an hashtag" />');
    });

    $('#removeHashtag').click(function () {
        $('#hashtagContainer input:last-child').remove()
    });
//Inserir comentario
    $(document).on('keydown', function (e) {
        var targetInput = $(e.target);
        if (targetInput.is('textarea')) {
            //alert('Typed while not focused on #myInput!');
            if (e.which == 13) { 
                e.preventDefault();
                $('.commentSection').each(function () {
                    if ($(this).attr("name") == targetInput.attr('name')) { 
var myvar = '<img class="w3-circle" src="'+$('#fotoPerfil').attr('src')+'" style="height:48px;width:48px;display:inline-block;margin-right:10px;" alt="Avatar" /><p class="w3-padding w3-round-large w3-light-grey" style="display:inline-block;width:90%;"> <span style="color:blue; font-weight: bold;">'+$('#userId').text()+'</span><span style="margin-left:1%;">'+ targetInput.val() +'</span><i class="fa fa-trash fa-lg" style="float:right;"></i></p>';
                        $(this).append(myvar);
                    }
                });
                // $("#commentSection").append('<p>'+targetInput.val()+'</p>');
                ajaxPost(targetInput.val(), targetInput.attr('name'),
                    p => alert(JSON.stringify(p)),
                    e => {
                        alert('AJAX ERRO:' + JSON.stringify(e));
                        console.log("AJAX ERRO:" + JSON.stringify(e));
                    });
                targetInput.val('');
            }
        }
    });

    function ajaxPost(texto, id, success, error) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/posts/comment",
            data: JSON.stringify({ comment: texto, id: id }),
            dataType: "json",
            success: success,
            error: error
        })
    }
 
//Adiciona os amigos à janela do chat
$.ajax({
    type: "GET",
    contentType: "application/json",
    url: "http://localhost:3000/api/friends/get/user/"+$('#userId').attr("name"),
    dataType: "json",
    success: function (data) {    
        $("#chatUsers").html('')
        $("#chatUsers").append("<h3>Chat</h3>") 
        if(data.length!=0){ 
            for(i=0; i<data[0].friends.length; i++){
                var myvar = '<p><img style="margin-right:2%" src="https://www.infrascan.net/demo/assets/img/avatar5.png" class="w3-circle" width="32"><span class="w3-hover-white" onclick="loadUser('+'\''+data[0].friends[i].id+'\','+'\''+data[0].friends[i].name+'\');" style="cursor: pointer">'+data[0].friends[i].name+'</span></p>';
                $("#chatUsers").append(myvar) 
            }
}
    }
})

//Clique no butão de exportar
$('#exporta').click(function () {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/export",
        success: function (data) { 
            alert(data)
        }
    }) 
});

})