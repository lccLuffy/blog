@extends('layouts.app')
@section('content')
    <div class="row">
        <p class="lead">{{ $title }}</p>
        @foreach($comics as $comic)
            <div class="col-md-3">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <a href="{{ url('chapter',['id'=>$comic->Id,'Title'=>$comic->Title]) }}"><label
                                    class="lead">{{ $comic->Title }}</label></a>
                    </div>
                    <div class="panel-body">
                        <img class="img-thumbnail" src="{{ $comic->FrontCover }}">
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@endsection