<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Post;
use App\User;
use Dingo\Api\Routing\Helpers;

class APIPostController extends Controller
{
    use Helpers;
    public function __construct()
    {
        $this->middleware('api.auth',['except' => ['index']]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return Post::all();
    }
}
