<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaceJumpController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::post('diceRoll', [SpaceJumpController::class,'diceRollFunction']);
Route::post('initBoard', [SpaceJumpController::class,'generateBoard']);
Route::post('resetBoard', [SpaceJumpController::class,'resetBoard']);
Route::get('getDBinfo', [SpaceJumpController::class, 'getCurrentDBInfo']);
Route::post('getHoles', [SpaceJumpController::class, 'getHoles']);
Route::post('wormholePosP1', [SpaceJumpController::class, 'wormholePositionP1']);
Route::post('wormholePosP2', [SpaceJumpController::class, 'wormholePositionP2']);
Route::post('blackholePosP1', [SpaceJumpController::class, 'blackholePositionP1']);
Route::post('blacholePosP2', [SpaceJumpController::class, 'blackholePositionP2']);
Route::post('newPosP1', [SpaceJumpController::class, 'newPositionPlayer1']);
Route::post('newPosP2', [SpaceJumpController::class, 'newPositionPlayer2']);
Route::post('dbP1WdbP2L', [SpaceJumpController::class, 'updateDBPlayer1']);
Route::post('dbP1LdbP2W', [SpaceJumpController::class, 'updateDBPlayer2']);
