
var socket = io('http://localhost:3000');

function renderMessage(message){
    $('.messages').append(`<div class="message"><strong>${message.author}</strong>: ${message.message}</div>`)
}

socket.on('previousMessages', messages =>{
    messages.forEach(message => {
        renderMessage(message);
    });
});

socket.on('receivedMessage',(message) =>{
    renderMessage(message);
});

$('#chat').submit((event) =>{
    event.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if(author.length && message.length){
        var messageObj = { author:author, message:message };

        renderMessage(messageObj);

        socket.emit('sendMessage', messageObj);
    }   
    $('input[name=message]').val("");
});