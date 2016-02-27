<li class="list-group-item list-group-item-heading">
    <article>
        <a href="{{ route('post.show',$post->id) }}">
            <p class="lead">{{ $post->title }}</p>
        </a>
        {{--@foreach($post->tags()->lists('name') as $tag)
            <i class="fa fa-tag"></i>{{ $tag }}
        @endforeach--}}

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