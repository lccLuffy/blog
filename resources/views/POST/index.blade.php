@extends('layouts.app')
@section('content')
    <div class="row">
        @include('partials.success')
        @include('partials.errors')
        <div>
            @each('post.item',$posts,'post')
        </div>
        {!! $posts->links()  !!}
    </div>
@endsection