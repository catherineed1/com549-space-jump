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
                        <!-- <form action="/action_page.php">
                                <label for="player1">Player 1:</label>
                                <input type="text" id="player1" name="player1"><br><br>
                                <label for="player2">Player 2:</label>
                                <input type="text" id="player2" name="player2"><br><br>
                                <input class="submit" type="submit" value="Submit players">
                        </form><br><br> -->
                        <button class="start" id="gameBtn">Start Game</button><br><br>
                </div>

                <div class="header-right">
                        <button class="dice" id="rollDice">Dice</button><br><br>
                </div>
        </div> 

        <div id="board"></div>

        @yield('content')
    <script src="{{asset('js/custom_student.js')}}"></script>
</body>
</html>
