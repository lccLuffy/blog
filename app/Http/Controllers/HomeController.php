<?php

namespace App\Http\Controllers;


use App\User;
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
        return view('index');
    }

    public function newToken()
    {
        $token = JWTAuth::fromUser(User::first());
    }
}
