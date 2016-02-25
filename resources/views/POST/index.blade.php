@extends('layouts.app')
@section('content')
    <div class="row">
        @include('partials.success')
        @include('partials.errors')
        <div>
            @each('post.item',$posts,'post')
        </div>
        <div class="col-md-12">
            {!! $posts->links()  !!}
        </div>
    </div>
@endsection