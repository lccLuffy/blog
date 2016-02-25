@extends('layouts.app')
@section('content')
    <div class="jumbotron">
        <p class="lead">{{ $user->username }}</p>
    </div>
    <div class="row">
        <div class="col-md-8">
            @each('post.item',$posts,'post')
        </div>
        <div class="col-md-8">
            {!! $posts->links()  !!}
        </div>
    </div>

@endsection