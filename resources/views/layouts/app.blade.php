<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>
        lcc_luffy
        @yield('title')
    </title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="lcc_luffy blog 博客 laravel"/>
    <meta name="author" content="lcc_luffy"/>
    <meta name="description" content=" @section('description') @show"/>

    <link href="http://cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>
    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">
    @yield('css')
</head>
<body id="app-layout">
@include('partials.nav')
<div class="container">
    @yield('content')
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
@yield('scripts')
</body>
</html>
