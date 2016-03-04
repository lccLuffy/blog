<!DOCTYPE html>
<html lang="en">
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


    <!-- Fonts -->
    <link href="http://cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>

    <!-- Styles -->
    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">
    {{--<link href="{{ elixir('css/web/theme.css') }}" rel="stylesheet">--}}
    @yield('css')
</head>
<body id="app-layout">
<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">

            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#app-navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>


            <a class="navbar-brand" href="{{ url('/') }}">
                lcc_luffy
            </a>
        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
            <!-- Left Side Of Navbar -->
            <ul class="nav navbar-nav">
                <li><a href="{{ route('post.index') }}">文章</a></li>
                <li><a href="{{ route('post.create') }}">发布</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                       aria-expanded="false">分类<span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        @forelse($categories as $category)
                            <li><a href="{{ url('comic',0) }}">{{ $category->name }}</a></li>
                        @empty
                            <li>无分类</li>
                        @endforelse
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                       aria-expanded="false">漫画<span class="caret"></span></a>
                    <ul class="dropdown-menu list-group" role="menu">
                        <li><a href="{{ url('comic',0) }}">热血</a></li>
                        <li><a href="{{ url('comic',2) }}">同人</a></li>
                        <li><a href="{{ url('comic',3) }}">鼠绘</a></li>
                        <li><a href="{{ url('onepiece/parse') }}"></i>海贼分析</a></li>
                    </ul>
                </li>
            </ul>
            <!-- Right Side Of Navbar -->
            <ul class="nav navbar-nav navbar-right">
                <!-- Authentication Links -->
                @if (Auth::check())
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            {{ Auth::user()->username }} <span class="caret"></span>
                        </a>

                        <ul class="dropdown-menu" role="menu">
                            <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>退出登录</a></li>
                            <li><a href="{{ route('user.index',Auth::id()) }}"><i class="fa fa-user"></i>个人主页</a></li>
                        </ul>
                    </li>
                @else
                    <li><a href="{{ url('/login') }}">登录</a></li>
                    <li><a href="{{ url('/register') }}">注册</a></li>
                @endif
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    @yield('content')
</div>
<!-- JavaScripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
{{--<script src="{{ elixir('js/web/theme.js') }}"></script>--}}
@yield('scripts')
</body>
</html>
