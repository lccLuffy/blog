<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests;

class APIPostController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function posts()
    {
        return response()->json(Post::paginate(5));
    }
}
