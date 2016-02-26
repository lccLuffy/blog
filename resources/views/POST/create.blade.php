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
        var editor, mobileToolbar, toolbar;
        Simditor.locale = 'zh';
        toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color',
            '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment', 'marked'];
        mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
        if (false) {
            toolbar = mobileToolbar;
            ``
        }
        editor = new Simditor({
            textarea: $('#editor'),
            toolbar: toolbar,
            pasteImage: true,
        });
    </script>
@endsection