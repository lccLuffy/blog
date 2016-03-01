<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class AdminController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('admin.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function users()
    {
        $users = User::all();
        return view('admin.users',compact('users'));
    }

    public function posts()
    {
        $posts = Post::all();
        return view('admin.posts',compact('posts'));
    }
    public function post(Post $post)
    {
        return view('admin.post',compact('post'));
    }
}
