@extends('layouts.app')
@section('css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2-rc.1/css/select2.min.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="/simditor-2.3.6/styles/simditor.css"/>
@endsection
@section('content')

    <div class="row">
        <div class="col-md-12">
            @include('partials.errors')
            <form class="form-horizontal" method="post" role="form" action="{{route('post.store')}}">
                {!! csrf_field() !!}
                @include('post.form')
                <button type="submit" class="btn btn-success">提交</button>
            </form>
        </div>
    </div>

@endsection
@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2-rc.1/js/select2.min.js"></script>
    <script type="text/javascript" src="/simditor-2.3.6/scripts/module.js"></script>
    <script type="text/javascript" src="/simditor-2.3.6/scripts/hotkeys.js"></script>
    <script type="text/javascript" src="/simditor-2.3.6/scripts/uploader.js"></script>
    <script type="text/javascript" src="/simditor-2.3.6/scripts/simditor.js"></script>
    <script type="text/javascript" src="/simditor-2.3.6/scripts/marked.js"></script>
    <script type="text/javascript" src="/simditor-2.3.6/scripts/simditor-marked.js"></script>

    <script>
        $('#tag_select').select2({
            tags:true
        });

        var editor, mobileToolbar, toolbar;
        
        toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color',
            '|', 'ol', 'ul', 'blockquote', 'code', /*'table',*/ '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment', 'marked'];
        mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
        if (false) {
            toolbar = mobileToolbar;
        }
        editor = new Simditor({
            textarea: $('#editor'),
            toolbar: toolbar,
            pasteImage: true,
            cleanPaste: true,
            defaultImage: '/simditor-2.3.6/images/image.png',
            upload : {
                url : 'http://localhost:8000/upload', //文件上传的接口地址
                fileKey: 'picture', //服务器端获取文件数据的参数名
                params: {
                    '_token':"{{ csrf_token() }}"
                },
                connectionCount: 3,
                leaveConfirm: '正在上传文件'
            }
        });
    </script>
@endsection