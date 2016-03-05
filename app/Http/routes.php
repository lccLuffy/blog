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


$api = app('Dingo\Api\Routing\Router');

$api->version('v1',['middleware' => ['api.throttle']], function ($api) {

    $api->resource('tag', 'App\Http\Controllers\API\APITagController',['except' => ['show','update']]);

    $api->resource('post','App\Http\Controllers\API\APIPostController');
});


/*Route::group(['prefix' => 'api', 'middleware' => 'api'], function () {

    Route::get('tags', 'API\APITagController@tags');
    Route::get('posts', 'API\APIPostController@posts');
    Route::post('login', 'API\APIAuthController@login');

});*/

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

    /**
     * 网站
     */
    Route::get('/', 'HomeController@index');
    Route::get('api', 'API\APITagController@index');

    Route::get('/welcome', 'HomeController@welcome');

    Route::post('upload', 'PostController@uploadPicture');


    /**
     * 文章
     */
    Route::resource('/post', 'PostController');


    /**
     * 用户
     */
    Route::auth();
    Route::get('user/{user}', ['uses' => 'UserController@index', 'as' => 'user.index']);
    Route::post('user/uploadAvatar', ['uses' => 'UserController@uploadAvatar', 'as' => 'user.uploadAvatar']);


    /**
     * 漫画
     */
    Route::get('comic/{ClassifyId}', 'ComicController@index');
    Route::get('chapter/{id}/{title}', 'ComicController@chapter');
    Route::get('images/{id}/{title}', 'ComicController@images');
    Route::get('onepiece/parse', 'ComicController@onepieceParse');


});


/**
 * Admin
 */
Route::group(['prefix' => 'admin'], function () {
    Route::get('/', ['uses' => 'AdminController@index', 'as' => 'admin.index']);
    Route::get('users', ['uses' => 'AdminController@users', 'as' => 'admin.users']);
    Route::get('posts', ['uses' => 'AdminController@posts', 'as' => 'admin.posts']);
    Route::get('post/{post}', ['uses' => 'AdminController@post', 'as' => 'admin.post']);
});
