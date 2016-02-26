<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Mockery\CountValidator\Exception;

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
        $result = true;
        try
        {
            $finalName = 'blog_'.Hash::make(time());
            $file = request()->file('picture');
            $content = File::get($file->getRealPath());

            $disk = Storage::disk('qiniu');
            $url = '';

            if ($disk->put($finalName, $content)) {
                $url = $disk->getDriver()->downloadUrl($finalName);
            }
        }
        catch(Exception $o)
        {
            $result = false;
        }
        return json_encode([
            'success' => $result,
            'file_path' => $url,
        ]);
    }
}
