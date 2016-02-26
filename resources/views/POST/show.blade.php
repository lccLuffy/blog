@extends('layouts.app')
@section('title',$post->title)
@section('css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.10/css/share.min.css" rel="stylesheet">
@endsection
@section('content')
    <div class="row">
        <main class="col-md-9">


            <article>
                <a href="{{ route('post.show',$post->id) }}">
                    <p class="lead">{{ $post->title }}</p>
                </a>
                <p>{!! $post->content_html !!}</p>
                @foreach($post->tags()->lists('name') as $tag)
                    <i class="fa fa-tag"></i>{{ $tag }}
                @endforeach

                <div>
                    <span><i class="fa fa-clock-o"></i>{{ $post->updated_at->diffForHumans() }}</span>
            <span><i class="fa fa-user"></i><a
                        href="{{ route('user.index',$post->user_id) }}">{{ $post->user->username }}</a></span>
                    @can('post.update',$post)
                    <form role="form" method="post" action="{{ route('post.destroy',$post->id) }}">
                        {!!  csrf_field() !!}
                        <input type="hidden" name="_method" value="delete">
                        <button type="submit" class="btn btn-danger">
                            <i class="fa fa-times-circle"></i> 删除
                        </button>
                    </form>
                    @endcan
                    @can('post.update',$post)
                    <a href="{{ route('post.edit',$post->id) }}">
                        <button type="submit" class="btn btn-info">
                            <i class="fa fa-edit"></i> 编辑
                        </button>
                    </a>
                    @endcan
                </div>
            </article>
            <div class="panel-footer">
                <div class="social-share"></div>
            </div>
        </main>
        <aside class="col-md-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    侧栏
                </div>
                <div class="panel-body">
                    内容
                </div>
            </div>
            @include('sidebar.search')
        </aside>
    </div>
@endsection
@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.10/js/share.min.js"></script>
@endsection