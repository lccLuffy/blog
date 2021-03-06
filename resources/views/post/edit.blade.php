@extends('layouts.app')
@section('css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2-rc.1/css/select2.min.css" rel="stylesheet"/>
@endsection
@section('content')
    <div class="row">
        <div class="col-md-12">
            @include('partials.errors')
            @include('partials.success')
            <form class="form-horizontal" method="post" role="form" action="{{route('post.update',$post->id)}}">
                {!! csrf_field() !!}
                <input type="hidden" name="_method" value="put">
                @include('post.form')
                <button type="submit" class="btn btn-success">修改</button>
            </form>
        </div>
    </div>
@endsection
@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2-rc.1/js/select2.min.js"></script>
    <script>
        $.getJSON("{{url('api/tag')}}", function (json) {
            var tags =[]
            $.each(json.results,function(idx,item){
                tags[idx] = item.name;
            })
            $('#tag_select').select2({
                tags: true,
                maximumSelectionLength: 5,
                data:tags
            });

        });

    </script>
@endsection