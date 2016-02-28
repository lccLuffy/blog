@extends('layouts.app')
@section('content')
    <div class="row">
        <div class="col-md-12">
            @include('partials.errors')
        </div>
        <div>
            {!! $content !!}
        </div>
    </div>
@endsection