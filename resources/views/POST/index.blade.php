@extends('layouts.app')
@section('content')
    <div class="row">
        @include('partials.success')
        @include('partials.errors')
        <div class="col-md-8">
            @each('post.item',$posts,'post')
        </div>
        <div class="col-md-8">
            {!! $posts->links()  !!}
        </div>
    </div>
@endsection