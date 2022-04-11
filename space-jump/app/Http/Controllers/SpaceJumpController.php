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

    public function getCurrentDBInfo(){
        return DB::table('player')->orderBy('num_of_games_won', 'desc')->get();
    }

}
