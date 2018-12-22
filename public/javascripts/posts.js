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
                if (data[i].state == "public") {
                    if (data[i].picture) {
                        pic = '<img class="w3-margin-bottom" src=' + 'images/' + data[i].picture + ' style="width:100%;" />'
                    } else {
                        pic = ""
                    }
                    if (data[i].comments) {
                        for (j = 0; j < data[i].comments.length; j++) {
                            comments = comments + '<p>' + data[i].comments[j].user.split(":")[1] + "        " + data[i].comments[j].message + '</p>'
                        }
                    } else {
                        comments = ""
                    } 
                    myvar = myvar + '<div class="w3-container w3-card w3-black w3-round w3-margin"><br/>' +
                        '<img class="w3-left w3-circle w3-margin-right" style="width:60px;" src="/w3images/avatar6.png" alt="Avatar" /><span class="w3-right w3-opacity">32 min</span>' +
                        '    <h4>Angie Jane</h4><br/>' +
                        '    <hr class="w3-clear" />' +
                        '    <p>' + data[i].title + '</p>' + pic + '<p>' + data[i].content + '</p><div class="w3-card w3-black" style="display: inline;">'+
                        '    <p class="w3-margin-bottom" id=' + data[i]._id + ' style="display: inline;">'+data[i].votes.length+' </p><i class="far fa-thumbs-up" style="font-size:24px; padding: 5px; display: inline;"></i></div><button class="w3-button w3-margin-bottom" type="button" id="teste" onclick="voteFunc('+currentUser+', '+data[i]._id+')"><i class="fa fa-chevron-up"> Upvote</i></button><button class="w3-button w3-margin-bottom" type="button"><i class="fa fa-chevron-down"> Downvote</i></button><button class="w3-button w3-margin-bottom"' +
                        '        type="button"><i class="fa fa-comment"> Comment </i></button>' +
                        '    <div class="w3-container w3-card commentSection" name=' + data[i]._id + '>' +
                        comments + '</div>'+
                        '<textarea id="NewComment" name=' + data[i]._id + ' cols="80%" rows="1" placeholder="Enter a new comment"></textarea>' +
                        '</div>';
                }
                $('#conteudoPosts').append(myvar);
            }

        }
    });
}

var currentUser
function getUser(user) {
    currentUser=user
  }
function voteFunc(user,post){  
        var result = $('#'+''+post+'').text()
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/posts/vote",
            data: JSON.stringify({ user: user, post: post }),
            dataType: "json",
            success: function () {
            }
        }) 
        $('#'+''+post+'').text((parseInt(result)+1)) 
}

$(() => {
    $('#hashtags').load('http://localhost:3000/posts/hashtags');

    $('#addHashtag').click(function () {
        $('#hashtagContainer').append('<input class="w3-padding w3-round-xxlarge" style="width:26%" type="text" placeholder="Insert an hashtag" name="hashtags[]"></input>');
    });

    $('#removeHashtag').click(function () {
        $('#hashtagContainer input:last-child').remove()
    });

    $(document).on('keydown', function (e) {
        var targetInput = $(e.target);
        if (targetInput.is('textarea')) {
            //alert('Typed while not focused on #myInput!');
            if (e.which == 13) { 
                e.preventDefault();
                $('.commentSection').each(function () {
                    if ($(this).attr("name") == targetInput.attr('name')) {
                        $(this).append('<p>' + targetInput.val() + '</p>');
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
})