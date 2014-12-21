$(document).ready(function(){
    var socket = new WebSocket("ws://localhost:8080/state");
    var gridSize = 30;

    var $board = $('#board');
    var $ball = $('#ball');
    var $player1 = $('#player1');
    var $player2 = $('#player2');
    var $score1 = $('#score1');
    var $score2 = $('#score2');


    $.get('http://localhost:8080/gamedata', function(data) {
        data = JSON.parse(data);
        var boardX = data.size[0];
        var boardY = data.size[1];
        var paddleLength = data.paddleLength;
        var boardXpx = gridSize * boardX;
        var boardYpx = gridSize * boardY;
        $board.css('height', boardYpx);

        $board.css('width', boardXpx);
        $player2.css('display', 'block');
        $player2.css('left', (boardX - 1) * gridSize);
        $player2.css('height', gridSize * paddleLength);
        $player2.css('width', gridSize);

        $player1.css('display', 'block');
        $player1.css('left', 0);
        $player1.css('height', gridSize * paddleLength);
        $player1.css('width', gridSize);
    });

    var ballSize = gridSize;

    $ball.css('height', ballSize);
    $ball.css('width', ballSize);
    $ball.css('display', 'block');


    socket.onmessage = function(res) {
        var data = JSON.parse(res.data);
        var posX = data.b[0];
        var posY = data.b[1];

        var player1 = data.p1;
        var player2 = data.p2;

        $score1.text(data.s1);
        $score2.text(data.s2);

        $player1.css('top', player1 * gridSize);
        $player2.css('top', player2 * gridSize);

        $ball.css('left', posX * gridSize);
        $ball.css('top', posY * gridSize);
    };

});
