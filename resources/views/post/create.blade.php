@extends('layouts.app')
@section('css')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.2-rc.1/css/select2.min.css" rel="stylesheet"/>
    <style>
        textarea {
            -moz-box-sizing: border-box;
            -webkit-font-smoothing: subpixel-antialiased;
            -webkit-box-sizing: border-box;
            background: #fff;
            border: none;
            box-sizing: border-box;
            color: #333;
            font-family: 'Roboto Mono', monospace;
            font-size: 16px;
            height: 100%;
            line-height: 28px;
            margin: 0;
            padding: 20px;
            resize: none;
            vertical-align: top;
            width: 100%;
        }

        textarea:focus {
            outline: none;
        }

        button {
            background: #fff;
            border: none;
            color: #379;
            cursor: pointer;
            line-height: 24px;
            text-align: left;
            padding: 20px;
            width: 100%;
        }

        div.title {
            background: #222;
            color: #777;
            padding: 20px;
            position: absolute;
        }

        div.title strong {
            color: #fff;
            font-weight: normal;
        }

        div.output {
            background: #222;
            bottom: 289px;
            color: #fff;
            overflow: auto;
            padding: 20px;
            position: absolute;
            top: 128px;
        }

        div.time {
            background: #222;
            bottom: 225px;
            color: #777;
            position: absolute;
            padding: 20px;
        }

        div.time strong {
            color: #fff;
            font-weight: normal;
        }

        div.output-source {
            background: #222;
            bottom: 0;
            height: 185px;
            overflow: auto;
            padding: 20px;
            position: absolute;
        }
    </style>
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
    <script>
        $.getJSON("{{url('api/tag')}}", function (json) {
            var tags = []
            $.each(json.results, function (idx, item) {
                tags[idx] = item.name;
            })
            $('#tag_select').select2({
                tags: true,
                maximumSelectionLength: 5,
                data: tags
            });

        });
    </script>
@endsection