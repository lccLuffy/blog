<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Requests\PostRequest;
use App\Post;
use App\Tag;
use Carbon\Carbon;
use EndaEditor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Mockery\CountValidator\Exception;

class PostController extends Controller
{
    /**
     * PostController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show','upload']]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::orderBy('updated_at','desc')->paginate(6);
        return view('post.index')->with('posts', $posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('post.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PostRequest|\Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $post = Post::create($request->creatingData());

        $post->syncTags($request->get('tags', []));

        return redirect()->route('post.index')->with('success', '发布成功');
    }

    /**
     * Display the specified resource.
     *
     * @param Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $post->increment('view_count',1);
        return view('post.show',compact('post'));
    }

    /**
     * @param Post $post
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Post $post)
    {
        if ($this->cannotUpdatePost($post)) {
            abort(403);
        }

        return view('post.edit', compact('post'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PostRequest $request
     * @param Post $post
     * @return \Illuminate\Http\Response
     * @internal param $PostRequest
     * @internal param int $id
     */
    public function update(PostRequest $request, Post $post)
    {
        if ($this->cannotUpdatePost($post)) {
            abort(403);
        }

        $post->syncTags($request->get('tags', []));
        $post->setUpdatedAt(Carbon::now());
        if ($post->update($request->updatingData()))
        {
            return back()->with('success', '修改成功');
        }
        return back()->withErrors('修改失败');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Post $post
     * @return \Illuminate\Http\Response
     * @throws \Exception
     * @internal param int $id
     */
    public function destroy(Post $post)
    {
        if ($this->cannotUpdatePost($post)) {
            abort(403);
        }

        if ($post->delete()) {
            //$post->tags()->detach();  软删除，不要删除标签
            return redirect()->route('post.index')->with('success', '删除成功');
        }
        return redirect()->route('post.index')->with('success', '删除失败');
    }

    /**
     * @param Request $request
     * @return string
     */
    public function uploadPicture(Request $request)
    {
        $result = true;
        try
        {
            $finalName = 'blog_'.$request->user()->username.'_'.Hash::make(time());
            $file = $request->file('picture');
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

        if($result)
        {
            $msg = '上传成功';
        }
        else
        {
            $msg = '上传失败';
        }
        return json_encode([
            'success' => $result,
            'msg'=> $msg,
            'file_path' => $url,
        ]);
    }

    /**
     * @param Post $post
     * @return boolean
     */
    public function cannotUpdatePost(Post $post)
    {
        return Gate::denies('post.update', $post);
    }
}
