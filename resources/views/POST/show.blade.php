@extends('layouts.app')
@section('title',$post->title)
@section('css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.10/css/share.min.css" rel="stylesheet">
@endsection
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
                <div class="panel-footer">
                    <div class="social-share"></div>
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
            @include('sidebar.search')
        </aside>
    </div>
@endsection
@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.10/js/share.min.js"></script>
@endsection