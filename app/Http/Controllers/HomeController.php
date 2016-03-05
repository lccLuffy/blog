<?php

namespace App\Http\Controllers;
use App\User;
use Dingo\Api\Routing\Helpers;
use JWTAuth;
class HomeController extends Controller
{
    /**
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function welcome()
    {
        return view('welcome');
    }


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        dd(JWTAuth::fromUser(User::first()));
        return view('index');
    }
}
