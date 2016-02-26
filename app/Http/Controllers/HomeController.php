<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Requests\Request;
use App\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['welcome', 'index', 'upload']]);
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
        $posts = $user->posts()->orderBy('updated_at', 'desc')->paginate(6);
        return view('user.index', compact('user', 'posts'));
    }

    public function upload()
    {
        return json_encode([
            'success' => true,
            'file_path' => 'http://localhost:8000/'.request()->get('picture'),
        ]);
    }
}
