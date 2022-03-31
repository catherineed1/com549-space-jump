<!DOCTYPE html>
<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/app.css">
    </head>
    <body>
        <div class="header">
                <div class="header-center">
                        <h1>Space Jump</h1>
                        <p>Enter 2 players and press start to begin the game.</p><br>
                        <form action="/action_page.php">
                                <label for="player1">Player 1:</label>
                                <input type="text" id="player1" name="player1"><br><br>
                                <label for="player2">Player 2:</label>
                                <input type="text" id="player2" name="player2"><br><br>
                                <input class="header-start" type="submit" value="Start Game">
                        </form>
                </div>

                <div class="header-left">
                        <button class="dice">Dice</button> 
                </div>

                <div class="header-right">
                        <p>Player 1</p>
                        <p>Player 2</p>
                </div>
        </div>

        <div class="grid-holder">
               <p>grid goes here when start pressed</p>
        </div>
        
</body>
</html>
