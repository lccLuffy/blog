@extends('layouts.app')
@section('title',$post->title)
@section('css')
    <link rel="stylesheet" href="/simditor-2.3.6/styles/simditor.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.10/css/share.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/default.min.css">
@endsection
@section('content')
    <div class="row">
        <main class="col-md-9">
            <article>
                <a href="{{ route('post.show',$post->id) }}">
                    <p class="lead">{{ $post->title }}</p>
                </a>
                <div>
                    {!! $post->content_html !!}
                </div>
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
            <div>
                <!-- 多说评论框 start -->
                <div class="ds-thread" data-thread-key="{{ $post->id }}" data-title="{{ $post->title }}"
                     data-url="{{ route('post.show',$post->id) }}"></div>
                <!-- 多说评论框 end -->
                <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
                <script type="text/javascript">
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
                </script>
                <!-- 多说公共JS代码 end -->

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
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/highlight.min.js"></script>

    <script>
        $(document).ready(function () {
            $("pre[class^='lang']").each(function (i, block) {
                hljs.highlightBlock(block);
            });
            hljs.initHighlightingOnLoad();  // 加这句是为了兼容之前的。
        });
    </script>
@endsection