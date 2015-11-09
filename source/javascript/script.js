var socket = io.connect();

var myUsername = "";


function addMessage(msg, pseudo) {
    if(pseudo === myUsername){
    $("#chatEntries").append('<div class="message"><p>Me : ' + msg + '</p></div>');
    }
    else{
    $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
    }
}

function sentMessage() {

    if ($('#messageInput').val() !== ""){
        socket.emit('message', $('#messageInput').val());
        //addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
        $('#messageInput').val('');
    }
}

function setPseudo() {
    if ($("#pseudoInput").val() !== ""){
        myUsername = $("#pseudoInput").val();
        socket.emit('setPseudo', $("#pseudoInput").val());
        $('#chatControls').show();
        $('#pseudoInput').hide();
        $('#pseudoSet').hide();
    }
}


socket.on('message', function(data) {
    if(data.message !== undefined){
    addMessage(data.message, data.pseudo);
    }
});

socket.on('gah', function(data) {
    console.log("need username");
        alert(data.message);
    $("#pseudoSet").show();
    $("#pseudoInput").show();
    $("#chatControls").hide();
    $("#pseudoSet").click(function() {setPseudo();});


});


$(function() {
    $("#chatControls").hide();
    $("#pseudoSet").click(function() {setPseudo();});
    $("#submit").click(function() {sentMessage();});
});
