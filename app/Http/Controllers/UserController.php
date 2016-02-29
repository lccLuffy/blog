<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * UserController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index']]);
    }

    /**
     * @param User $user
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(User $user)
    {
        $posts = $user->posts()->orderBy('updated_at', 'desc')->paginate(6);
        return view('user.index', compact('user', 'posts'));
    }
    public function uploadAvatar(Request $request)
    {
        $message = '上传失败';
        try{
            $result = uploadPicture('blog_avatar_'.Auth::user()->username, $request->file('avatar'));
        }
        catch(\Exception $e)
        {
            $result = false;
            $message .= $e->getMessage();
        }
        if($result)
        {
            $message = '上传成功';
            $user = Auth::user();
            $user->avatar = $result;
            $user->save();
        }
        return response()->json([
            'success' => $result,
            'message' =>$message
        ]);
    }

}
