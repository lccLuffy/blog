@extends('layouts.app')
@section('content')
    <div class="row">
        <div class="col-md-12">
            @include('partials.errors')
        </div>
        <ul class="list-group">
            @foreach($items as $item)
                <li class="list-group-item list-group-item-heading">
                    <p class="lead"><a href="{{ $item['href'] }}">{{ $item['title'] }}</a></p>

                    <p>{{ $item['description'] }}</p>
                </li>
            @endforeach
        </ul>

    </div>
@endsection