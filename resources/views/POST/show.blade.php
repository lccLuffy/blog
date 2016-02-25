@extends('layouts.app')
@section('title',$post->title)
@section('content')
    <div class="row">
        <main class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    {{ $post->title }}
                </div>
                <div class="panel-body">
                    {!! $post->content !!}
                </div>
            </div>
        </main>
        <aside class="col-md-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    侧栏
                </div>
                <div class="panel-body">
                    内容
                </div>
            </div>
        </aside>
    </div>
@endsection