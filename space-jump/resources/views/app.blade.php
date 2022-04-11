<!DOCTYPE html>
<html>
    <head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="{{asset('css/custom.css')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/b2aeece440.js" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Space jump</title>
    </head>
    <body>
        <div class="header-top">
                <h1>Space Jump</h1><br>
                <h6>Enter names for player 1 and player 2 and press 'start game'. When the game starts press the 'roll dice' button to take your turn.</h6>
                <h6>To view the leaderboard press the 'leaderboard' button.</h6><br>
        </div>

        <div class="container">
                <div class="row">
                        <div class="col">
                                <div class="startControl">
                                        <label for="player1">Player 1:</label>
                                        <input type="text" id="player1" name="player1"><br><br>
                                        <label for="player2">Player 2:</label>
                                        <input type="text" id="player2" name="player2"><br><br><br>
                                        <button class="start" id="gameBtn">Start Game</button><br><br>
                                        <button class="leaderboard" id="getLeaderboard">Leaderboard</button><br><br>
                                </div>
                        </div>
                                <div class="col">
                                        <div class="board" id="board"></div>
                                </div>
                                <div class="col">
                                        <div class="boardControl">
                                                <button class="diceBtn" id="rollDice">Roll dice</button><br><br>
                                                <label id="currentPlayer"></label><br><label>  is: </label><br><label id="playerName"></label><br><br>
                                                <label>The last roll was a: </label> <label id="diceLabel"></label><br><br>
                                                <i id="diceIcon"></i>
                                        </div>
                                </div>
                </div>
                <br><br>
                <div class="row">
                        <table id="leaderboard" class="table">
                                <thead>
                                        <tr>
                                        <th id="pname" scope="col">Player Name</th>
                                        <th id="gameP" scope="col">Num of Games Played</th>
                                        <th id="gameW"  scope="col">Num of Games Won</th>
                                        <th id="gameL"  scope="col">Num of Games Lost</th>
                                        </tr>
                                </thead>
                                <tbody> 

                                </tbody>
                        </table>
                </div>
        </div>


        @yield('content')
    <script src="{{asset('js/custom_student.js')}}"></script>
</body>
</html>
