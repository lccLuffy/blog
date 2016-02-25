<div class="form-group">
    <div class="input-group col-md-12">
        <label for="title">标题</label>
        <input type="text" class="form-control" name="title" placeholder="标题"
               value="{{ $post->title or old('title') }}">
    </div>
</div>


<div class="form-group">
    <div class="input-group col-md-12">
        <div class="editor">
            <textarea id='myEditor' class="form-control" name="content_raw" placeholder="内容">{{ $post->content_raw or old('content_raw') }}</textarea>

        </div>
    </div>
</div>
<div class="form-group">
    <div class="input-group col-md-12">
        <label for="content">标签</label>
        <select id="tag_select" class="form-control" name="tags[]" multiple>
            @if(isset($post))
                @foreach($post->tags()->lists('name') as $index => $tag)
                    <option selected="selected">{{ $tag }}</option>
                @endforeach
            @endif
        </select>
    </div>
</div>
@section('scripts')
    @include('vendor.editor.head')
@endsection