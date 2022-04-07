<!DOCTYPE html>
<html>
    <head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="{{asset('css/custom.css')}}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Space jump</title>
    </head>
    <body>
        <div class="header">
                <div class="header-center">
                        <h1>Space Jump</h1><br>
                </div>

                <div class="header-left">
                        <!-- <input type="text" id="P1" value=""><br><br>
                        <input type="text" id="P2" value=""><br><br> -->
                        <button class="start" id="gameBtn">Start Game</button><br><br>
                </div>

                <div class="header-right">
                        <label> Current player is: </label><label id="currentPlayer">Player 1</label><br><br>
                        <button class="dice" id="rollDice">Roll dice</button><br><br>
                        <label>The last roll was a: </label> <label id="diceLabel"></label><br><br><label id="diceIcon">
                </div>
        </div> 

        <div id="board"></div>

        @yield('content')
    <script src="{{asset('js/custom_student.js')}}"></script>
</body>
</html>
