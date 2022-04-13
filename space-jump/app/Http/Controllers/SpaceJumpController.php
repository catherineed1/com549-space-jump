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
        return 'Board Generated';
    }

    public function resetBoard(){
        return 'Board reset';
    }

    public function generateWormholes(){
        $wormholes = array(3, 13, 21);
        return $wormholes;
    }

    public function generateBlackholes(){
        $blackholes = array(28,11);
        return $blackholes;
    }

    public function updateDB(){
        
    }

    public function getCurrentDBInfo(){
        return DB::table('player')->orderBy('num_of_games_won', 'desc')->get();
    }

}
