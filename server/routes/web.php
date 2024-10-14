<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\MediaCrudController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::prefix('dashboard')->as('dashboard.')->middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('index');

    Route::resource('roles', RoleController::class)->names('roles');
    Route::resource('users',UserController::class)->names('users');
    Route::resource('media', MediaCrudController::class)->names('media');
    Route::resource('categories',controller: CategoryController ::class)->names('categories');
});

require __DIR__ . '/auth.php';