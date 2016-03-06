<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Post;
use App\User;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class APIPostController extends BaseController
{
    public function __construct()
    {
        $this->middleware('api.auth', ['except' => ['index']]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 6);
        $result = Post::orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->select('id', 'user_id', 'title', 'category_id', 'view_count', 'created_at')
            ->get()->toArray();
        return ['error' => false, 'currentPage' => $page, 'perPage' => $perPage, 'results' => $result];
    }

    public function store(Request $request)
    {
        $rules = [
            'title' => 'required',
            'content_markdown' => 'required|min:5',
        ];

        $validator = $this->getValidationFactory()->make($request->only('title', 'content_markdown'), $rules);
        if ($validator->fails()) {
            abort(200, json_encode($validator->errors()));
        }

        $post = Post::create([
            'title' => $request['title'],
            'content_markdown' => $request['content_markdown'],
            'content_html' => markdown2Html($request['content_markdown']),
            'user_id' => $this->user()->id,
        ]);
        if ($post) {
            return $this->wrapArray('create success', false, 'create success');
        } else {
            return $this->wrapArray('create fail', true, 'create fail');
        }
    }
}
