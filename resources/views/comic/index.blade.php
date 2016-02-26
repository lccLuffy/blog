@extends('layouts.app')
@section('content')
    <div class="row">
        <h1 class="text-center">{{ $title }}</h1>
        <div class="col-md-12">
            @include('partials.errors')
        </div>
        @foreach($comics as $comic)
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <a href="{{ url('chapter',['id'=>$comic->Id,'Title'=>$comic->Title]) }}"><span
                                    class="lead">{{ $comic->Title }}</span></a>
                    </div>
                    <div class="panel-body">
                        <img class="img-thumbnail" src="{{ $comic->FrontCover }}">
                    </div>
                </div>
            </div>
        @endforeach
        <div class="col-md-12">
            <ul class="pagination">
                @if($page <= 0)
                    <li class="disabled"><a>&laquo;</a></li>
                @else
                    <li><a href="?page={{ $page-1 }}">&laquo;</a></li>
                @endif

                <li><a href="?page={{ $page+1 }}">&raquo;</a></li>
            </ul>
        </div>
    </div>
@endsection