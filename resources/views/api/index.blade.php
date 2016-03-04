@extends('layouts.app')
@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">API</div>
        <div class="panel-body">
            <ol class="list-group">
                <li class="list-group-item list-group-item-heading">
                    文章<span class="pull-right"><a href="{{ url('api/posts') }}">api/posts</a></span>
                </li>
                <li class="list-group-item list-group-item-heading">
                    标签<span class="pull-right"><a href="{{ url('api/tags') }}">api/tags</a></span>
                </li>
            </ol>
        </div>

    </div>
@endsection