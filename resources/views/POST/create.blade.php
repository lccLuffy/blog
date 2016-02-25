@extends('layouts.app')
@section('content')

    <div class="row">
        <div class="col-md-12">
            @include('partials.errors')
            <form class="form-horizontal" method="post" role="form" action="{{route('post.store')}}">
                {!! csrf_field() !!}
                @include('post.form')
                <button type="submit" class="btn btn-success">提交</button>
            </form>
        </div>
    </div>

@endsection