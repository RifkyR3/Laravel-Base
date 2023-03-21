<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::get('{any}', function () {
//    $path = public_path('index.html');
//    abort_unless(file_exists($path), 400, 'Page is not Found!');
//    return file_get_contents($path);
////    return view('app');
//})
//    ->name('FrontEnd')
//    ->where('any', '^(?!api|!base|!telescope|!sanctum/csrf-cookie).*$');

Route::get('/', function () {
    return view('welcome');
});
