$(()=>{
    $('#addHashtag').click(function(){
        $('#hashtagContainer').append('<input class=".w3-border.w3-padding" type="text" name="hashtags[]"></input>');
    });

    $(document).on('keydown', function(e) {
        var targetInput = $(e.target);
          if(targetInput.is('textarea')) {
             //alert('Typed while not focused on #myInput!');
             if(e.which == 13){
               //alert(targetInput.attr('name'));  
               e.preventDefault();
               $('.commentSection').each(function() {
                   if($(this).attr("name")==targetInput.attr('name')){
                    $(this).append('<p>'+targetInput.val()+'</p>');
                   }
                }); 
              // $("#commentSection").append('<p>'+targetInput.val()+'</p>');
               ajaxPost(targetInput.val(),targetInput.attr('name'),
               p=> alert(JSON.stringify(p)),
               e =>{
                   alert('AJAX ERRO:'+JSON.stringify(e));
                   console.log("AJAX ERRO:"+JSON.stringify(e));
               });
               targetInput.val('');
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