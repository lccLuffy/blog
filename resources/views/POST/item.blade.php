<div class="col-md-4">

    <article>
        <p class="page-header">{{ $post->title }}</p>
        <p>{!! $post->content !!}</p>
        <div>
            <ul class="list-group list-group-item-heading">
                <li><i class="fa fa-clock-o"></i>{{ $post->updated_at->diffForHumans() }}</li>
            </ul>
            <a href="{{ route('post.show',$post->id) }}">
                <button class="btn btn-block">查看</button>
            </a>
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