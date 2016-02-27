<!DOCTYPE html>
<html>
<head>


    <title>
        lcc_luffy
        @yield('title')
    </title>
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    @yield('css')
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
<nav>
    <div class="nav-wrapper">
        <a href="{{ url('/') }}" class="brand-logo">lcc_luffy</a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li><a href="{{ route('post.index') }}">文章</a></li>
            <li><a href="{{ route('post.create') }}">发布</a></li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                   aria-expanded="false">漫画<span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="{{ url('comic',0) }}"></i>热血</a></li>
                    <li><a href="{{ url('comic',2) }}"></i>同人</a></li>
                    <li><a href="{{ url('comic',3) }}"></i>鼠绘</a></li>
                </ul>
            </li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">Javascript</a></li>
            <li><a href="mobile.html">Mobile</a></li>
        </ul>
    </div>
</nav>
<div class="container">
    @yield('content')
</div>


<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
<script>
    $(".button-collapse").sideNav();

</script>
@yield('scripts')
</body>
</html>