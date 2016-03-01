@extends('admin.layouts.app')
@section('css')
    <link href="http://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css" rel='stylesheet' type='text/css'>
@endsection
@section('content')
    <table class="table table-bordered table-striped table-responsive" id="data-table">
        <caption>浏览记录</caption>
        <thead>
        <tr>
            <th>IP</th>
        </tr>
        </thead>
        <tbody>
        @foreach($post->visitorRegistries as $visitorRegistry)
            <tr>
                <td>{{ $visitorRegistry->ip }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
@section('scripts')
    <script src="http://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#data-table').DataTable({
                "language": {
                    "lengthMenu": "每页显示 _MENU_ 个",
                    "zeroRecords": "啥都没找到",
                    "info": "第 _PAGE_ 页，共 _PAGES_ 页",
                    "infoEmpty": "表为空",
                    "infoFiltered": "(filtered from _MAX_ total records)"
                }
            });

        } );
    </script>
@endsection