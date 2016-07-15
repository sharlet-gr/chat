var socket = io();
$(document).ready(function(){
  var user_name=window.prompt('Enter Your Name');
  $('#user').val(user_name);
  socket.emit('user name',user_name);
});
function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  var to= $('#r').val();
  console.log(from,message,to);
  if(message != '') {
    $('#messages').append('<li><b style="color:green">Me</b> to '+to+': '+ message + '</li>');
    socket.emit('chatMessage', from, message, to);
  }
  $('#r').val('').focus();
  $('#m').val('');
  return false;
}

socket.on('userjoin', function(from, user_name){
  var me = $('#user').val();
  var msg = (user_name == me) ? 'You have joined the discussion' : user_name +' has joined the discussion';
  $('#messages').append('<li><b>' + from + '</b>: ' + msg + ' </li>');
});
socket.on('chatMessage', function(from, msg, to){
  $('#messages').append('<li><b style="color:#009afd">' + from + '</b>: ' + msg + '</li>');
});


