<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Post;
use App\Tag;

class APIController extends Controller
{

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('api.index');
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function tags()
    {
        return response()->json(Tag::all('name'));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function posts()
    {
        return response()->json(Post::paginate(5));
    }
}
