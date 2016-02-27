@extends('layouts.app')
@section('css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2-rc.1/css/select2.min.css" rel="stylesheet"/>
    <link href="{{ elixir('css/simditor/app.css') }}" rel="stylesheet">

@endsection
@section('content')
    <div class="row">
        <div class="col-md-12">
            @include('partials.errors')
            @include('partials.success')
            <form class="form-horizontal" method="post" role="form" action="{{route('post.update',$post->id)}}">
                {!! csrf_field() !!}
                <input type="hidden" name="_method" value="put">
                @include('post.form')
                <button type="submit" class="btn btn-success">修改</button>
            </form>
        </div>
    </div>
@endsection
@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2-rc.1/js/select2.min.js"></script>

    <script src="{{ elixir('js/simditor.js') }}"></script>
    <script>
        $('#tag_select').select2({
            tags:true
        });

        var editor, mobileToolbar, toolbar;
        Simditor.locale = 'zh-CN';
        toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color',
            '|', 'ol', 'ul', 'blockquote', 'code',/* 'table', */'|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment', '|','html'];
        mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
        if (false) {
            toolbar = mobileToolbar;
        }
        editor = new Simditor({
            textarea: $('#editor'),
            toolbar: toolbar,
            pasteImage: true,
            defaultImage: "{{ asset('images/image.png') }}",
            upload : {
                url : 'http://localhost:8000/upload', //文件上传的接口地址
                fileKey: 'picture', //服务器端获取文件数据的参数名
                params: null,
                connectionCount: 3,
                leaveConfirm: '正在上传文件'
            }
        });
    </script>
@endsection