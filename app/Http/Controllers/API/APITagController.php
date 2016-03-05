<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Tag;
use Dingo\Api\Routing\Helpers;

class APITagController extends Controller
{

    use Helpers;
    public function __construct()
    {
        $this->middleware('api.auth',['except' => ['index']]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return Tag::all('name');
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        return Tag::all();
    }

    public function destroy(Tag $tag)
    {
       return $tag;
    }

}
