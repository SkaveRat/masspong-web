$(document).ready(function(){
    var socket = new WebSocket("ws://localhost:8080/echo");

    var gridSize = 30;
    var boardX = 20;
    var boardY = 10;
    var boardXpx = gridSize * boardX;
    var boardYpx = gridSize * boardY;

    var ballSize = gridSize;

    $('#ball').css('height', ballSize);
    $('#ball').css('width', ballSize);

    $('#board').css('height', boardYpx);
    $('#board').css('width', boardXpx);

    socket.onmessage = function(res) {
        var data = JSON.parse(res.data);
        var posX = data.position[0];
        var posY = data.position[1];
        console.log(data);
        $('#ball').css('left', posX * gridSize);
        $('#ball').css('top', posY * gridSize);
    };

});
