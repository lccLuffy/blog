<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="wb:webmaster" content="4ed6b1566c93d733"/>
    <title>
        lcc_luffy
        @yield('title')
    </title>

    <!-- Fonts -->
    <link href="//cdn.bootcss.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>

    <!-- Styles -->
    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">
    @yield('css')
</head>
<body id="app-layout">
<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">

            <!-- Collapsed Hamburger -->
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#app-navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <!-- Branding Image -->
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
                       aria-expanded="false">漫画<span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="{{ url('comic',0) }}"></i>热血</a></li>
                        <li><a href="{{ url('comic',2) }}"></i>同人</a></li>
                        <li><a href="{{ url('comic',3) }}"></i>鼠绘</a></li>
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
@yield('scripts')
</body>
</html>
