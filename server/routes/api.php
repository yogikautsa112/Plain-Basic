<?php

use App\Http\Controllers\API\MediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/media', [MediaController::class, 'index']);
Route::post('/media', action: [MediaController::class, 'store']);
Route::delete('/media{id}', action: [MediaController::class, 'destroy']);