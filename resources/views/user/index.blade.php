@extends('layouts.app')
@section('content')
    <div class="jumbotron">
        <p class="lead">{{ $user->username }}</p>
    </div>
    <div class="row">
        @each('post.item',$user->posts,'post')
    </div>
@endsection