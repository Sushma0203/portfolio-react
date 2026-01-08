<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HomeInfoController;
use App\Http\Controllers\Admin\AboutInfoController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ChatBotController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/
Route::get('/home-data', [FrontendController::class, 'home']);
Route::get('/about-data', [FrontendController::class, 'about']);
Route::get('/contact-data', [FrontendController::class, 'contact']);
Route::get('/gallery-data', [FrontendController::class, 'gallery']);
Route::get('/projects-data', [FrontendController::class, 'projects']);

Route::post('/contact-submit', [ContactController::class, 'submit']);
Route::get('/chats', [ChatController::class, 'index']);
Route::post('/chats', [ChatController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Auth API Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Admin API Routes (Protected)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    Route::get('/home-info/edit', [HomeInfoController::class, 'edit']);
    Route::put('/home-info', [HomeInfoController::class, 'update']);
    
    Route::get('/about-info/edit', [AboutInfoController::class, 'edit']);
    Route::put('/about-info', [AboutInfoController::class, 'update']);
    
    Route::apiResource('gallery', GalleryController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('messages', MessageController::class);
    Route::apiResource('chatbot', ChatBotController::class);
});
