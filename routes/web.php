<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| SPA fallback
|--------------------------------------------------------------------------
|
| Any route that does not match an API or asset route will serve the React SPA.
|
*/

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
