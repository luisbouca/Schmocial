$(() => {
    var socket = io.connect('http://localhost:3000');  

    $("#sendMessage").click(function () { 
        
        socket.emit("news", { message: $("#message").val(), id:personTalkingTo })
    });

    socket.on('news', function (data) {
        $("#chatId").append("<p>"+data.message+"</p>")
        console.log("asfasasouiadhoasjd"+data.message);
    });
})

var personTalkingTo
function loadUser(id) {
    personTalkingTo=id
} 