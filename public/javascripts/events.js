$(() => {
    //Carrega o evento mais proximo que participas
    var eventos
    var pic
    var contador = 0
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/api/events/",
        dataType: "json",
        success: function (data) {
            $("#conteudoEventos").html('')
            eventos = data
            if (eventos.length == 0) {
                var myvar = '<div class="w3-container">' +
                    '    <p>Upcoming Events:</p>' +
                    '    <p><strong>Não tem eventos próximos</strong></p>' +
                    '</div>';
            } else {
                for (i = 0; i < eventos.length; i++) {
                    if(contador==1){
                        break;
                    }else{
                    for (j = 0; j < eventos[i].participants.length; j++) {
                        if (eventos[i].participants[j].id == $("#userId").attr('name')) {
                            contador=1
                            if (eventos[i].picture) {
                                pic = '<img src="images/eventos/'+eventos[i].picture+'" alt="Forest" style="width:100%;" />'
                            } else {
                                pic = ""
                            }
                            var myvar = '<div class="w3-container">' +
                                '    <p>Upcoming Events:</p>'+pic+'' +
                                '    <p><strong>' + eventos[i].title + '</strong></p>' +
                                '    <p>' + eventos[i].date + '</p>' +
                                '    <p><button class="w3-button w3-block w3-white">Info</button></p>' +
                                '</div>';
                                break;
                        }
                    }
                }
                if(contador==0 && i==eventos.length-1){
                    var myvar = '<div class="w3-container">' +
                    '    <p>Upcoming Events:</p>' +
                    '    <p><strong>Não tem eventos próximos</strong></p>' +
                    '</div>';
                }
                }

            }

            $("#conteudoEventos").append(myvar)
        }
    })
})
//Mostra a informação de cada evento
function showEventInfo(id, data, local, titulo, descricao, utilizador) {
    $("#idDoEvento").text(id)
    $("#eventoData").text(data)
    $("#eventoLocal").text(local)
    $("#eventoTitle").text(titulo)
    $("#eventoDescription").text(descricao)

    var participantes
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3000/api/events/participants/" + id,
        dataType: "json",
        success: function (data) {
            $("#eventoParticipants").html('')
            participantes = data[0].participants
            if (participantes.length != 0) {
                for (i = 0; i < participantes.length; i++) {
                    $("#eventoParticipants").append(participantes[i].name)
                    if (participantes[i].id == utilizador) {
                        $("#acceptEvent").hide();
                        break;
                    }
                }
            } else {
                $("#acceptEvent").show();
                $("#eventoParticipants").text("Ainda não existem participantes")
            }
            $("#eventInfo").css("display", "block");
        }
    })
}

//Submete participaçao
function submeteParticipacao(idUtilizador, nameUtilizador) {
    var idPost = $("#idDoEvento").text()
    var participante = {
        id: idUtilizador,
        name: nameUtilizador
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/api/events/participant",
        data: JSON.stringify({ idPost: idPost, participant: participante }),
        dataType: "json",
        success: function () {
            window.location.href = "http://localhost:3000/home"
        }
    })
}