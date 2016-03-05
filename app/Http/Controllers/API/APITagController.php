<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Tag;

class APITagController extends Controller
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
        return Tag::all();
    }

    public function show(Tag $tag)
    {
       return $tag;
    }

}
