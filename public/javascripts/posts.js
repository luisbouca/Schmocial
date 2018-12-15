$(()=>{

    $('#NewComment').on('keypress', function (e) {
        if(e.which === 13){
 if(!$('#NewComment').val()==""){ 
    e.preventDefault();
        $("#commentSection").append('<p>'+$('#NewComment').val()+'</p>');
        ajaxPost($('#NewComment').val(),$('#idPost').val(),
        p=> alert(JSON.stringify(p)),
        e =>{
            alert('AJAX ERRO:'+JSON.stringify(e));
            console.log("AJAX ERRO:"+JSON.stringify(e));
        });
    $('#NewComment').val("")
 }

        }
  });

    function ajaxPost(texto,id,success,error){
        $.ajax({
            type:"POST",
            contentType:"application/json",
            url: "http://localhost:3000/posts/comment",
            data: JSON.stringify({comment: texto, id:id}),
            dataType: "json",
            success: success,
            error: error
        })
    }
})