<div class="form-group">
    <div class="input-group col-md-12">
        <label for="title">标题</label>
        <input type="text" class="form-control" name="title" placeholder="标题"
               value="{{ $post->title or old('title') }}">
    </div>
</div>
<div class="form-group">
    <div class="input-group col-md-12">
        <label for="content">内容</label>
        <textarea class="form-control" name="content" placeholder="内容"
                  rows="25">{{ $post->content or old('content') }}</textarea>
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