$(document).ready(function(){
    var socket = new WebSocket("ws://localhost:8080/state");
    var gridSize = 30;

    $.get('http://localhost:8080/gamedata', function(data) {
        data = JSON.parse(data);
        var boardX = data.size[0];
        var boardY = data.size[1];
        var boardXpx = gridSize * boardX;
        var boardYpx = gridSize * boardY;
        $('#board').css('height', boardYpx);
        $('#board').css('width', boardXpx);
    });

    var ballSize = gridSize;

    $('#ball').css('height', ballSize);
    $('#ball').css('width', ballSize);
    $('#ball').css('display', 'block');


    socket.onmessage = function(res) {
        var data = JSON.parse(res.data);
        var posX = data.b[0];
        var posY = data.b[1];
        $('#ball').css('left', posX * gridSize);
        $('#ball').css('top', posY * gridSize);
    };

});
