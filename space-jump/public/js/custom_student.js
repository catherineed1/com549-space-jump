$(document).ready(function() {
    var size = 6;
    var player1;
    var player1Position;
    var player2;
    var player2Position;
    var diceThrow;
    var currentplayer;
    var data;

    getLeaderboard();
    $('.boardControl').hide();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function getLeaderboard() {
        $.ajax({
            type: "GET",
            url: "getDBinfo",
            dataType: 'json',
            success: function(jsonObj) {
                console.log(jsonObj);
                $("#getLeaderboard").on("click", function() {
                    $.each(jsonObj, function(i, val) {
                        $("#leaderboard").append(
                            '<tr><td>' + val.player_name +
                            '</td><td>' + val.num_of_games_played +
                            '</td><td>' + val.num_of_games_won +
                            '</td><td>' + val.num_of_games_lost +
                            '</td><td>' + val.win_loose_ratio +
                            '</td></tr>'
                        );

                    });
                });

            }
        });
    }

    function initDie() {
        $('.boardControl').show();
        $("#rollDice").on("click", function() {
            $.ajax({
                type: "POST",
                cache: false,
                url: "diceRoll",
                success: function(jsonObj) {
                    console.log("dice roll: " + jsonObj);

                    diceThrow = parseInt(jsonObj);
                    $("#diceLabel").html(diceThrow);

                    player1 = $('div.triangleP1').attr('id');
                    player1Position = player1.substring(0, player1.indexOf('P'));
                    player2 = $('div.triangleP2').attr('id');
                    player2Position = player2.substring(0, player2.indexOf('P'));

                    $('#diceIcon').show();
                    $("#diceIcon").removeClass();
                    $("#diceIcon").addClass("fa-solid");

                    generatePlayerPos();

                }

            });

        })
    }

    function generatePlayerPos() {
        $.ajax({
            type: "POST",
            cache: false,
            url: "getHoles",
            success: function(holePos) {
                console.log(holePos);
                if (parseInt(player1Position) == holePos[0] || parseInt(player2Position) == holePos[0]) {
                    wormhole();
                } else if (parseInt(player1Position) == holePos[1] || parseInt(player2Position) == holePos[1]) {
                    wormhole();
                } else if (parseInt(player1Position) == holePos[2] || parseInt(player2Position) == holePos[2]) {
                    wormhole();
                    return true;
                } else if (parseInt(player1Position) == holePos[3] || parseInt(player2Position) == holePos[3]) {
                    blackhole();
                    return true;
                } else if (parseInt(player1Position) == holePos[4] || parseInt(player2Position) == holePos[4]) {
                    blackhole();
                    return true;
                } else {
                    switch (diceThrow) {
                        case 1:
                            $("#diceIcon").addClass("fa-dice-one");
                            movePlayer();
                            break;
                        case 2:
                            $("#diceIcon").addClass("fa-dice-two");
                            movePlayer();
                            break;
                        case 3:
                            $("#diceIcon").addClass("fa-dice-three");
                            movePlayer();
                            break;
                        case 4:
                            $("#diceIcon").addClass("fa-dice-four");
                            movePlayer();
                            break;
                        case 5:
                            $("#diceIcon").addClass("fa-dice-five");
                            movePlayer();
                            break;
                        case 6:
                            $("#diceIcon").addClass("fa-dice-six");
                            movePlayer();
                            break;
                    }
                    $("#diceIcon").addClass("fa-3x");
                }

            }
        });

    }

    function movePlayer() {
        if (parseInt(player1Position) == 36) {
            $.ajax({
                type: "POST",
                data: {
                    player1: "Bill",
                    player2: "Sarah"
                },
                url: "dbP1WdbP2L",
                success: function(jsonObj) {
                    console.log(jsonObj);
                    alert("Player 1 is the winner!");
                }
            });
        } else if (parseInt(player2Position) == 36) {
            $.ajax({
                type: "POST",
                data: {
                    player1: "Bill",
                    player2: "Sarah"
                },
                url: "dbP1LdbP2W",
                success: function(jsonObj) {
                    console.log(jsonObj);
                    alert("Player 2 is the winner!");
                }
            });
        } else {
            currentplayer = $("#currentPlayer").html();
            console.log("current player: " + currentplayer);
            switch (currentplayer) {
                case "Player 1":
                    $.ajax({
                        type: "POST",
                        data: {
                            player1Position: parseInt(player1Position),
                            diceThrow: parseInt(diceThrow)
                        },
                        url: "newPosP1",
                        success: function(newPosP1) {
                            $("#" + player1Position + "P1").removeClass("triangleP1");
                            console.log("Players position: " + player1Position);
                            if (newPosP1 > 36) {
                                alert("Move not possible");
                                $("#" + (player1Position) + "P1").addClass("triangleP1");
                            } else {
                                console.log("New position will be: " + newPosP1);
                                $("#" + (newPosP1) + "P1").addClass("triangleP1");
                            }
                            $("#playerName").html(getPlayer2());
                            $("#currentPlayer").html("Player 2");
                        }
                    });
                    break;
                case "Player 2":
                    $.ajax({
                        type: "POST",
                        data: {
                            player2Position: parseInt(player2Position),
                            diceThrow: parseInt(diceThrow)
                        },
                        url: "newPosP2",
                        success: function(newPosP2) {
                            $("#" + player2Position + "P2").removeClass("triangleP2");
                            console.log("Players position: " + player2Position);
                            if (newPosP2 > 36) {
                                alert("Move not possible");
                                $("#" + (player2Position) + "P2").addClass("triangleP2");
                            } else {
                                console.log("New position will be: " + newPosP2);
                                $("#" + (newPosP2) + "P2").addClass("triangleP2");
                            }
                            $("#playerName").html(getPlayer1());
                            $("#currentPlayer").html("Player 1");
                        }
                    });
                    break;
            }
        }
    }

    $("#gameBtn").on("click", function() {
        if ($(this).hasClass('start')) {
            data = {
                gridSize: size
            };
            if (size >= 6) {
                initBoard(data);
                initDie();
                getPlayer1();
                getPlayer2();
                $("#playerName").html(getPlayer1());
                $("#currentPlayer").html("Player 1");
            }

        } else if ($(this).hasClass('reset')) {
            resetBoard(data);
        }
    });

    function initBoard(data) {
        $.ajax({
            type: "POST",
            data: {
                data: data,
                player1: 'catherine'
            },
            url: "initBoard",
            success: function(jsonObj) {
                console.log(jsonObj);
                buildBoard(size);

                $("#gameBtn").html('Reset Game');
                $("#gameBtn").removeClass("start");
                $("#gameBtn").addClass("reset");

                $("#" + 1 + "P1").addClass("triangleP1");
                $("#" + 1 + "P2").addClass("triangleP2");
            }
        });
    }

    function resetBoard(data) {
        $.ajax({
            type: "POST",
            cache: false,
            url: "resetBoard",
            success: function(jsonObj) {
                console.log(jsonObj);

                $("#board").empty();
                $("#gameBtn").html('Start Game');
                $("#gameBtn").removeClass("reset");
                $("#gameBtn").addClass("start");
                $('#boardControl').hide();
                $("#gridSize").val("-1");
            }
        });
    }

    function buildBoard(size) {
        $("#board").empty();

        $("#board").append("<div class='wrapper" + size + "' id='gridWrapper'>");

        for (let x = size * size; x > 0; x--) {
            if (x % size == 0 && (Math.abs((x / size) % 2) == 1) && x != size * size) {
                x = x - (size - 1);
                var row = "<div id='" + x + "' class='oddBox box" + x + " triangles'></div>";


                $("#gridWrapper").append(row);
                if (x % 2 == 0) {
                    $("#" + x).removeClass("oddBox");
                    $("#" + x).addClass("evenBox");
                }
                $("#" + x).append("<label>" + x + "</label>");
                $("#" + x).append("<div id=" + x + "P1></div>");
                $("#" + x).append("<div id=" + x + "P2></div>");


                for (let y = 0; y < size - 1; y++) {
                    x = x + 1;
                    var row = "<div id='" + x + "' class='oddBox box" + x + " triangles'></div>";
                    $("#gridWrapper").append(row);
                    if (x % 2 == 0) {
                        $("#" + x).removeClass("oddBox");
                        $("#" + x).addClass("evenBox");
                    }
                    $("#" + x).append("<label>" + x + "</label>");
                    $("#" + x).append("<div id=" + x + "P1></div>");
                    $("#" + x).append("<div id=" + x + "P2></div>");
                }

                x = x - size;
            }

            if (x != 0) {
                var row = "<div id='" + x + "' class='oddBox box" + x + " triangles'></div>";
                $("#gridWrapper").append(row);
                if (x % 2 == 0) {
                    $("#" + x).removeClass("oddBox");
                    $("#" + x).addClass("evenBox");
                }
                $("#" + x).append("<label>" + x + "</label>");
                $("#" + x).append("<div id=" + x + "P1></div>");
                $("#" + x).append("<div id=" + x + "P2></div>");

            }
        }
    }

    function wormhole() {
        alert("You landed on a wormhole +7 spaces");
        switch (currentplayer) {
            case "Player 1":
                $.ajax({
                    type: "POST",
                    data: {
                        player1Position: parseInt(player1Position)
                    },
                    url: "wormholePosP1",
                    success: function(wormholePosP1) {
                        $("#" + player1Position + "P1").removeClass("triangleP1");
                        $("#" + (wormholePosP1) + "P1").addClass("triangleP1");
                    }
                });
                break;
            case "Player 2":
                $.ajax({
                    type: "POST",
                    data: {
                        player2Position: parseInt(player2Position)
                    },
                    url: "wormholePosP2",
                    success: function(wormholePosP2) {
                        $("#" + player2Position + "P2").removeClass("triangleP2");
                        $("#" + (wormholePosP2) + "P2").addClass("triangleP2");

                    }
                });
                break;
        }
    }

    function blackhole() {
        alert("You landed on a blackhole -5 spaces");

        switch (currentplayer) {
            case "Player 1":
                $.ajax({
                    type: "POST",
                    data: {
                        player1Position: parseInt(player1Position)
                    },
                    url: "blackholePosP1",
                    success: function(blackholePosP1) {
                        $("#" + player1Position + "P1").removeClass("triangleP1");
                        $("#" + (blackholePosP1) + "P1").addClass("triangleP1");
                    }
                });
                break;
            case "Player 2":
                $.ajax({
                    type: "POST",
                    data: {
                        player2Position: parseInt(player2Position)
                    },
                    url: "blacholePosP2",
                    success: function(blackholePosP2) {
                        $("#" + player2Position + "P2").removeClass("triangleP2");
                        $("#" + (blackholePosP2) + "P2").addClass("triangleP2");
                    }
                });
                break;
        }

    }

    function getPlayer1() {
        return $("#player1").val();
    }

    function getPlayer2() {
        return $("#player2").val();
    }
});