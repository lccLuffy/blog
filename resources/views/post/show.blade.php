@extends('layouts.app')
@section('title',$post->title)
@section('css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.10/css/share.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/default.min.css">
    <link href="{{ elixir('css/simditor/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="http://localhost:8000/css/code/monokai-sublime.css">
@endsection
@section('description')
    {{ $post->title }}
@endsection
@section('content')
    <div class="row">
        {{--删除文章--}}
        <div class="modal fade" id="modal-delete">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            ×
                        </button>
                        <h4 class="modal-title">确认删除</h4>
                    </div>
                    <div class="modal-body">
                        <p class="lead">
                            <i class="fa fa-question-circle fa-lg"></i>
                            您确定要删除文章
                            <kbd><span id="delete-file-name1">{{ $post->title }}</span></kbd>
                            吗?
                            <small><i>[可恢复]</i></small>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <form role="form" method="post" action="{{ route('post.destroy',$post->id) }}">
                            {!!  csrf_field() !!}
                            <input type="hidden" name="_method" value="delete">
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                                取消
                            </button>

                            <button type="submit" class="btn btn-danger">
                                删除
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <main class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    {{--头像--}}

                    <div class="pull-right">
                        <img src="{{ $post->user->avatar?$post->user->avatar:defaultAvatar() }}"
                             class="img-circle img-thumbnail" style="width:65px; height:65px;">
                    </div>

                    {{--标题--}}

                    <p class="lead"><b>{{ $post->title }}</b></p>

                    {{--信息--}}
                    <i class="fa fa-user"></i><a
                            href="{{ route('user.index',$post->user_id) }}"><b>{{ $post->user->username }}</b></a>
                    •<i class="fa fa-calendar"></i>{{ $post->created_at->format('y/m/d  h:i') }}

                    {{ '•'.$post->view_count }}阅读
                    @can('post.update',$post)
                    <small>
                        <button type="button" class="btn btn-xs btn-success">
                            <a href="{{ route('post.edit',$post->id) }}"><i class="fa fa-edit"></i>编辑</a>
                        </button>

                        <button type="button" class="btn btn-xs btn-danger" data-toggle="modal"
                                data-target="#modal-delete">
                            <i class="fa fa-times-circle"></i>
                            删除
                        </button>
                    </small>
                    @endcan
                </div>

                <div class="panel-body">
                    {!! $post->content_html !!}
                </div>

                @if(count($tags = $post->tags()->lists('name')) > 0)
                    <p>
                        <i class="fa fa-tag"></i>
                        @foreach($tags as $tag)
                            <span class="label label-default">{{ $tag }}</span>
                        @endforeach
                    </p>
                @endif

            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="social-share"></div>
                </div>
                <div class="panel-body">
                    <div class="ds-thread" data-thread-key="{{ $post->id }}" data-title="{{ $post->title }}"
                         data-url="{{ route('post.show',$post->id) }}"></div>
                </div>
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
        </aside>
    </div>

@endsection
@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.10/js/share.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/highlight.min.js"></script>
    <script>
        $(document).ready(function () {
            /*$("pre[class^='lang']").each(function (i, block) {
             hljs.highlightBlock(block);
             });*/
            $('pre code').each(function (i, block) {
                hljs.highlightBlock(block);
            });
        });

        var duoshuoQuery = {short_name: "lcc-luffy"};
        (function () {
            var ds = document.createElement('script');
            ds.type = 'text/javascript';
            ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.unstable.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0]
            || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();

        function deletePost() {
            $("#modal-file-delete").modal("show");
        }
    </script>
@endsection