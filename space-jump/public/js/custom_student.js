$(document).ready(function() {
    let size = 36;
    let player1 = 1;
    let player2 = 1;
    let lastDie;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#boardControl').hide();

    $("#gameBtn").on("click", function() {
        alert('should init board');
        if ($(this).hasClass('start')) {
            var size = 36; //$("#gridSize").val();
            var data = { gridSize: size };
            if (size >= 6) {
                initBoard(size);
                buildBoard(size)
            }

        } else if ($(this).hasClass('reset')) {
            resetBoard();
        }
    });

    $("#gridSize").on("change", function() {
        var size = $(this).val();

        console.log(size);

        if (size >= 5) {
            buildBoard(size);
        }
    });

    $("#rollDice").on("click", function() {
        $.ajax({
            type: "POST",
            cache: false,
            url: "diceRoll",
            success: function(jsonObj) {
                console.log(jsonObj);

                $("#diceIcon").removeClass();

                if ( /*P1's turn*/ player1 == 1) {
                    $("#diceLabel").html("Roll dice player 1");
                } else if ( /*P2's turn*/ player2 == 1) {
                    $("#diceLabel").html("Roll dice player 2");
                }

                $("#diceIcon").addClass("fa-solid");
                switch ( /* last dice rolled*/ lastDie) {
                    case 1:
                        $("#diceIcon").addClass("fa-dice-one");
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

                $("#" + /*get P1 position*/ 1 + "P1").removeClass("triangleP1");
                $("#" + /*get P1 position*/ 1 + "P1").addClass("triangleP1");
                $("#" + /*get P2 position*/ 1 + "P2").removeClass("triangleP2");
                $("#" + /*get P2 position*/ 1 + "P2").addClass("triangleP2");


            }
        });
    });

    function initBoard(data) {
        $.ajax({
            type: "POST",
            data: "boardSize=" + data,
            url: "board",
            success: function(jsonObj) {
                console.log(jsonObj);
                /* handle json repsonse and setup your board*/

                $("#gameBtn").html('Reset Game');
                $("#gameBtn").removeClass("start");
                $("#gameBtn").addClass("reset");

                if ( /*P1's turn*/ player1 == 1) {
                    $("#diceLabel").html("Roll dice player 1");
                } else if ( /*P2's turn*/ player2 == 1) {
                    $("#diceLabel").html("Roll dice player 2");
                }

                if ( /* if game has been reset*/ player1 == 0) {
                    $("#diceIcon").removeClass();
                    $("#diceIcon").addClass("fa-solid fa-dice-d6 fa-2x");
                }

                $('#boardControl').show();

                $("#" + /*get P1 position*/ 1 + "P1").addClass("triangleP1");
                $("#" + /*get P2 position*/ 1 + "P2").addClass("triangleP2");


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
});