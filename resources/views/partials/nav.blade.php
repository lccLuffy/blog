<nav role="navigation" class="navbar navbar-default navbar-static-top">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="{{ url('/') }}">
                lcc_luffy
            </a>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#app-navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="{{ request()->is('post') ? 'active ':''}} menu-item"><a
                            href="{{ route('post.index') }}">文章</a></li>
                <li class="{{ request()->is('post/create') ? ' active':''}} menu-item"><a
                            href="{{ route('post.create') }}">发布</a>
                </li>
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
            <ul class="nav navbar-nav navbar-right">
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
                    <li class="{{ request()->is('login') ? ' active':''}} menu-item"><a
                                href="{{ url('/login') }}">登录</a></li>
                    <li class="{{ request()->is('register') ? ' active':''}} menu-item"><a
                                href="{{ url('/register') }}">注册</a>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>
