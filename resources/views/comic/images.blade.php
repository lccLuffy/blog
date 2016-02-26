@extends('layouts.app')
@section('content')
    <div class="row">
        <div class="col-lg-10 col-lg-offset-1 col-md-12">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <span class="lead">{{ $title }}</span>
                </div>
                <div class="panel-body">
                    @foreach($images as $image)
                        <img class="img-responsive center-block" src="{{ $image }}">
                    @endforeach
                </div>
                <div class="panel-footer">
                    End
                </div>
            </div>
        </div>
    </div>
@endsection