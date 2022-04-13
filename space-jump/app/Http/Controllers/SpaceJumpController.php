<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SpaceJumpController extends Controller
{
    
    public function diceRollFunction(){
        return rand(1,6);
    }

    public function generateBoard(){    
        return 'Board generated';  
    }

    public function resetBoard(){
        return 'Board reset';
    }

    public function newPositionPlayer1(Request $request){
        $player1Position = $request->get("player1Position");
        $diceThrow = $request->get("diceThrow");
        $newPosP1 = $player1Position + $diceThrow;
        return $newPosP1;
    }

    public function newPositionPlayer2(Request $request){
        $player2Position = $request->get("player2Position");
        $diceThrow = $request->get("diceThrow");
        $newPosP2 = $player2Position + $diceThrow;
        return $newPosP2;
    }

    public function getHoles(){
        $array = array(3,13,21,11,21);
        return $array;
    }

    public function wormholePositionP1(Request $request){
        $player1Position = $request->get("player1Position");
        $wormholePos = $player1Position + 7;
        return $wormholePos;
    }

    public function wormholePositionP2(Request $request){
        $player2Position = $request->get("player2Position");
        $wormholePos = $player2Position + 7;
        return $wormholePos;
    }

    public function blackholePositionP1(Request $request){
        $player1Position = $request->get("player1Position");
        $blackholePos = $player1Position - 5;
        return $blackholePos;
    }

    public function blackholePositionP2(Request $request){
        $player2Position = $request->get("player2Position");
        $blackholePos = $player2Position - 5;
        return $blackholePos;
    }

    public function getCurrentDBInfo(){
        return DB::table('player')->orderBy('win_loose_ratio', 'desc')->get();
    }

    public function updateDBPlayer1(Request $request){
        $player1 = $request->get("player1");
        $player2 = $request->get("player2");
        updateDBPlayerName($player1);
        updateDBGamesPlayed($player1);
        updateDBGamesWon($player1);
        updateDBGamesLost($player2);
        updateDBWinLooseRatio($player1);
        updateDBWinLooseRatio($player2);

        return 'Player 1 updated';
    }

    public function updateDBPlayer2(Request $request){
        $player1 = $request->get("player1");
        $player2 = $request->get("player2");
        updateDBPlayerName($player2);
        updateDBGamesPlayed($player2);
        updateDBGamesWon($player2);
        updateDBGamesLost($player1);
        updateDBWinLooseRatio($player1);
        updateDBWinLooseRatio($player2);

        return 'Player 2 updated';
        
    }

    public function updateDBPlayerName($player){
        Player::table('player')->insert(['player_name' => DB::raw($player)]);
        return $player;
    }

    public function updateDBGamesPlayed($player){
        Player::table('player')->where('player_name', $player)->update(['num_of_games_played' => DB::raw('num_of_games_played+1')]);
    }

    public function updateDBGamesWon($player){
        Player::table('player')->where('player_name', $player)->update(['num_of_games_won' => DB::raw('num_of_games_won+1')]);
    }

    public function updateDBGamesLost(){
        Player::table('player')->where('player_name', $player)->update(['num_of_games_lost' => DB::raw('num_of_games_lost+1')]);
        
    }

    public function updateDBWinLooseRatio(){
        Player::table('player')->where('player_name', $player)->update(['win_loose_ratio' => DB::raw('(num_of_games_won/num_of_games_played)*100')]);
        
    }

    public function testUpdate(){
        Player::table('player')->where('player_name', 'Bill')->update(array(
            'num_of_games_played'=>11, 'num_of_games_won'=> 6, 'num_of_games_lost'=>5, 'win_loose_ratio'=>55
));
    }


}
