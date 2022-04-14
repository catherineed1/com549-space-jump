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
        return 'Game reset';
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
        return DB::table('player')->orderBy('win_lose_ratio', 'desc')->get();
    }

    public function updateDBPlayerName($player){ 
        DB::table('player')->insert(
            ['player_name' => $player, 
            'num_of_games_played' => 0, 
            'num_of_games_won' => 0, 
            'num_of_games_lost' => 0,
            'win_lose_ratio' => 0]);

    }

    public function updateDBGamesPlayed($player){
        DB::table('player')->where('player_name', $player)->update(
            ['num_of_games_played' => DB::raw('num_of_games_played+1')]);
    }

    public function updateDBGamesWon($player){
        DB::table('player')->where('player_name', $player)->update(
            ['num_of_games_won' => DB::raw('num_of_games_won+1')]);
    }

    public function updateDBGamesLost($player){
        DB::table('player')->where('player_name', $player)->update(
            ['num_of_games_lost' => DB::raw('num_of_games_lost+1')]);
        
    }

    public function updateDBWinLoseRatio($player){
        DB::table('player')->where('player_name', $player)->update(
            ['win_lose_ratio' => DB::raw('(num_of_games_won/num_of_games_played)*100')]);
        
    }


    public function updateDBPlayer1(Request $request){
        $player1 = $request->get("player1");
        $player2 = $request->get("player2");
       
        $this->userExists($player1, $player2);
        $this->updateDBGamesPlayed($player1);
        $this->updateDBGamesWon($player1);
        $this->updateDBGamesLost($player2);
        $this->updateDBWinLoseRatio($player1);
       
        return 'Player 1 updated';
    }

    public function updateDBPlayer2(Request $request){
        $player1 = $request->get("player1");
        $player2 = $request->get("player2");

        $this->userExists($player1, $player2);
        $this->updateDBGamesPlayed($player2);
        $this->updateDBGamesWon($player2);
        $this->updateDBGamesLost($player1);
        $this->updateDBWinLoseRatio($player2);

        return 'Player 2 updated';
        
    }

    public function userExists($player1 , $player2){
        //$user1 = DB::table('player')->where('player_name', $player1)->get();
        $count1 = DB::table('player')->where('player_name', $player1)->count();
        $count2 = DB::table('player')->where('player_name', $player2)->count();
       // $user2 = DB::table('player')->where('player_name', $player2)->get();

        if($count1 == 0){
            $this->updateDBPlayerName($player1);
        }

        if($count2 == 0){
            $this->updateDBPlayerName($player2);
        }

    }


}
