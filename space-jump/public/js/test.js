$(document).ready(function() {
    var size = 6;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //when doc loads have start button and board initialised 
    $("#gameBtn").on("click", function() {
        if ($(this).hasClass('start')) {
            var data = { gridSize: size };
            if (size >= 6) {
                initBoard(data);
                initDie();
                log();
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

    //when start pressed show dice and player whos go it is (add 2 player traiangles)
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

    //assume player 1's turn and roll dice and move spaces
    //bounce to player 2's turn and roll dice and move spaces 
    while player1position & player2position != finalspcae {
            player1turn roll dice & move spaces

            then player2turn roll dice & move spaces

        }
        //complete above steps until player 1 or player 2 == 36 



});