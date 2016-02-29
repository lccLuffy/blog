@extends('layouts.app')
@section('content')
    <div class="row">
        @include('partials.success')
        @include('partials.errors')
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <ol class="list-group">
                @each('post.item',$posts,'post')
            </ol>
            {!! $posts->links()  !!}
        </div>
    </div>
@endsection