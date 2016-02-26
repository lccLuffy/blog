@extends('layouts.app')
@section('content')
    <div class="row">
        <h2 class="text-center">{{ $title }}</h2>
        <div class="col-md-12">
            @include('partials.errors')
        </div>
        @foreach($chapters as $chapter)
            <div class="col-md-3">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <a href="{{ url('images',['id'=>$chapter->Id,'title'=>$chapter->Title]) }}"><span
                                    class="lead">{{ $chapter->Title }}</span></a>
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