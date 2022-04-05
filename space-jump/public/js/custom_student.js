$(document).ready(function() {
    var size = 6;
    var player1;
    var player1Position;
    var player2;
    var player2Position;
    var lastDie;

    $('#rollDice').hide();
    $('#diceIcon').hide();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //dice roll function
    function initDie() {
        $('#rollDice').show();
        $("#rollDice").on("click", function() {
            $.ajax({
                type: "POST",
                cache: false,
                url: "diceRoll",
                success: function(jsonObj) {
                    console.log(jsonObj);
                    // lastDie = 
                    lastDie = 1;
                    player1 = $('div.triangleP1').attr('id');
                    player1Position = player1.substring(0, player1.indexOf('P'));
                    player2 = $('div.triangleP2').attr('id');
                    player2Position = player2.substring(0, player2.indexOf('P'));

                    $('#diceIcon').show();
                    $("#diceIcon").removeClass();

                    if (player1Position == 1) {
                        $("#diceLabel").html("Roll dice player 1");
                    } else if (player2Position == 1) {
                        $("#diceLabel").html("Roll dice player 2");
                    }

                    $("#diceIcon").addClass("fa-solid");

                    switch (lastDie) {
                        case 1:
                            $("#diceIcon").addClass("fa-dice-one");
                            movePlayer1();
                            break;
                        case 2:
                            $("#diceIcon").addClass("fa-dice-two");
                            break;
                        case 3:
                            $("#diceIcon").addClass("fa-dice-three");
                            break;
                        case 4:
                            $("#diceIcon").addClass("fa-dice-four");
                            break;
                        case 5:
                            $("#diceIcon").addClass("fa-dice-five");
                            break;
                        case 6:
                            $("#diceIcon").addClass("fa-dice-six");
                            break;
                    }

                    $("#diceIcon").addClass("fa-3x");


                }
            });
        });
    }

    $('#boardControl').hide();

    function movePlayer1() {

        $("#" + player1Position + "P1").removeClass("triangleP1"); //current pos 
        $("#" + (player1Position += lastDie) + "P1").addClass("triangleP1"); //current pos + dice roll

    }

    function movePlayer2() {

        //player 2 after player 1 
        $("#" + player2Position + "P2").removeClass("triangleP2");
        $("#" + (player2Position += lastDie) + "P2").addClass("triangleP2");
    }

    //update start button and init board
    $("#gameBtn").on("click", function() {
        if ($(this).hasClass('start')) {
            var data = { gridSize: size };
            if (size >= 6) {
                initBoard(data);
                initDie();
            }

        } else if ($(this).hasClass('reset')) {
            resetBoard(data);
        }
    });

    function initBoard(data) {
        $.ajax({
            type: "POST",
            data: "boardSize=" + data,
            url: "initBoard",
            success: function(jsonObj) {
                console.log(jsonObj);
                buildBoard(size);

                $("#gameBtn").html('Reset Game');
                $("#gameBtn").removeClass("start");
                $("#gameBtn").addClass("reset");

                if ( /*P1's turn*/ player1 == 1) {
                    $("#diceLabel").html("Roll dice player 1");
                } else if ( /*P2's turn*/ player2 == 1) {
                    $("#diceLabel").html("Roll dice player 2");
                }

                if ( /*if game has been reset*/ player1 == 0) {
                    $("#diceIcon").removeClass();
                    $("#diceIcon").addClass("fa-solid fa-dice-d6 fa-2x");
                }

                $('#boardControl').show();

                $("#" + 1 + "P1").addClass("triangleP1");
                $("#" + 1 + "P2").addClass("triangleP2");

            }
        });
    }

    function resetBoard(data) {
        $.ajax({
            type: "POST",

            cache: false,
            url: "php/resetBoard.php",
            success: function(jsonObj) {
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

    // $("#gridSize").on("change", function() {
    //     var size = $(this).val();

    //     console.log(size);

    //     if (size >= 5) {
    //         buildBoard(size);
    //     }
    // });
});