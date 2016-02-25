<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Tag;
use App\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except'=>['welcome','index']]);
    }

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

    /**
     * @param User $user
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showUser(User $user)
    {
        return view('user.index',compact('user'));
    }
}
