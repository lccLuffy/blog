<li class="list-group-item list-group-item-heading">
    <article>
        <div class="page-header">
            <a href="{{ route('post.show',$post->id) }}">
                <p class="lead">{{ $post->title }}</p>
            </a>
            <small>
                <i class="fa fa-user"></i><a
                        href="{{ route('user.index',$post->user_id) }}"><b>{{ ' '.$post->user->username }}</b></a>
                <i class="fa fa-calendar"></i>{{ ' '.$post->updated_at->diffForHumans() }}
            </small>
        </div>

        <p>
            {!! substr($post->content_html,0,100) !!}
        </p>

        <p>
            <i class="fa fa-tag"></i>
            @foreach($post->tags()->lists('name') as $tag)
                <span class="label label-default">{{ $tag }}</span>
            @endforeach
        </p>


        {{--<div>
           --}}{{-- <span><i class="fa fa-clock-o"></i>{{ $post->updated_at->diffForHumans() }}</span>
            <span><i class="fa fa-user"></i><a
                        href="{{ route('user.index',$post->user_id) }}">{{ $post->user->username }}</a></span>--}}{{--
            --}}{{--@can('post.update',$post)
            <form role="form" method="post" action="{{ route('post.destroy',$post->id) }}">
                {!!  csrf_field() !!}
                <input type="hidden" name="_method" value="delete">
                <button type="submit">
                     删除
                </button>
            </form>
            @endcan
            @can('post.update',$post)
            <a href="{{ route('post.edit',$post->id) }}">
                编辑
            </a>
            @endcan--}}{{--
        </div>--}}
    </article>
</li>