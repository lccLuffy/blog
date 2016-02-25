<div class="col-md-4">

    <article>
        <a href="{{ route('post.show',$post->id) }}">
            <p class="lead">{{ $post->title }}</p>
        </a>
        <p>{!! $post->content !!}</p>
        @foreach($post->tags()->lists('name') as $tag)
            <span><i class="fa fa-tag"></i>{{ $tag }}</span>
        @endforeach
        <div>
            <ul class="list-group list-group-item-heading">
                <li><i class="fa fa-clock-o"></i>{{ $post->updated_at->diffForHumans() }}</li>
                <li><i class="fa fa-user"></i><a href="{{ route('user.index',$post->user_id) }}">{{ $post->user->username }}</a> </li>
            </ul>
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

</div>