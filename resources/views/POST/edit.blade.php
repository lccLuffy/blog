@extends('layouts.app')
@section('content')

    <dic class="row">
        <div class="col-sm-8 col-md-8">
            @include('partials.errors')
            @include('partials.success')
            <form class="form-horizontal" method="post" role="form" action="{{route('post.update',$post->id)}}">
                {!! csrf_field() !!}
                <input type="hidden" name="_method" value="put">
                @include('post.form')
                <button type="submit" class="btn btn-success">修改</button>
            </form>

        </div>
    </dic>

@endsection