@extends('layouts.app')
@section('content')
    <div class="jumbotron">
        <div class="text-center">
            <img src="http://localhost:8000/images/image.png" class="img-circle img-thumbnail" style="width: 128px;">
            <p class="lead">{{ $user->username }}</p>
            <p>
                <small>description</small>
            </p>
            <p>
                <small><i>文章数：{{ $user->posts()->count() }}</i></small>
            </p>
        </div>
    </div>


    <div>
        <ul class="nav nav-tabs">
            <li class="active"><a href="#posts" data-toggle="tab" onclick="getPosts()">第一部分</a></li>
            <li class=""><a href="#panel-366099" data-toggle="tab">第二部分</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane" id="posts">
                <p>第一部分内容.</p>
            </div>
            <div class="tab-pane active" id="panel-366099">
                <p>第二部分内容.</p>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <script>
        function getPosts() {
            $.ajax({
                url: "{{ route('post.index') }}",
                type: "GET",
                success: function onSuccess(data) {
                    $('#posts').html(data);
                }
            })
        }

    </script>

@endsection