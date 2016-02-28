<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use App\Tag;


Route::group(['prefix' => 'api'], function () {

    Route::get('tags', 'APIController@tags');

});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {

    Route::get('/welcome', 'HomeController@welcome');

    Route::post('upload', 'PostController@uploadPicture');

    Route::resource('/post', 'PostController');

    Route::get('user/{user}', ['uses' => 'UserController@index', 'as' => 'user.index']);

    Route::get('comic/{ClassifyId}', 'ComicController@index');
    Route::get('chapter/{id}/{title}', 'ComicController@chapter');
    Route::get('images/{id}/{title}', 'ComicController@images');

    Route::get('onepiece/parse', 'ComicController@onepieceParse');
});

Route::group(['middleware' => 'web'], function () {
    Route::auth();

    Route::get('/', 'HomeController@index');
    Route::post('/', 'HomeController@upload');
});
