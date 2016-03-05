@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Welcome</div>
                    <div class="panel-body">
                        <form method="post" action="{{ url('api/login') }}">
                            <input type="text" name="email" value="528360256@qq.com">
                            <input type="password" name="password">
                            <button type="submit">OK</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection