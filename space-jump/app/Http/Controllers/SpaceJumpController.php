<?php

namespace App\Http\Controllers;
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
}
