var socket = io.connect('http://localhost:8080', {'forceNew':true});

socket.on('messages', function(data){
    console.log(data);
    render(data);
})

function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
  var message = {
    nickname: window.localStorage.name,
    text: document.getElementById('text').value
  };

  socket.emit('add-message', message);
  return false;
}
