var hashs = new Array()
function guardaHashtags(teste) {
    hashs.push(teste)
    $.ajax({
        url: "http://localhost:3000/api/posts/filter/",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify({ hashtags: hashs }),
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
                        '    <p>' + data[i].title + '</p>' + pic + '<p>' + data[i].content + '</p><button class="w3-button w3-margin-bottom" type="button"><i class="fa fa-chevron-up"> Upvote</i></button><button class="w3-button w3-margin-bottom" type="button"><i class="fa fa-chevron-down"> Downvote</i></button><button class="w3-button w3-margin-bottom"' +
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

$(() => {
    $('#hashtags').load('http://localhost:3000/posts/hashtags');

    $('#addHashtag').click(function () {
        $('#hashtagContainer').append('<input class="w3-border w3-padding" type="text" name="hashtags[]"></input>');
    });

    $(document).on('keydown', function (e) {
        var targetInput = $(e.target);
        if (targetInput.is('textarea')) {
            //alert('Typed while not focused on #myInput!');
            if (e.which == 13) {
                alert(targetInput.attr('name'));
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