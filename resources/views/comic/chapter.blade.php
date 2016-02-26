@extends('layouts.app')
@section('content')
    <div class="row">
        <p class="lead">{{ $title }}</p>
        @foreach($chapters as $chapter)
            <div class="col-md-3">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <a href="{{ url('images',$chapter->Id) }}"><label
                                    class="lead">{{ $chapter->Title }}</label></a>
                    </div>
                    <div class="panel-body">
                        <img class="img-thumbnail" src="{{ $chapter->FrontCover }}">
                    </div>
                    <div class="panel-footer">
                        第{{ $chapter->ChapterNo }}话
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@endsection