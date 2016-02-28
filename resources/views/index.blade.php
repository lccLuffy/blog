@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Dashboard</div>

                    <div class="panel-body">
                        <form id="avatar_upload" class="form-horizontal" role="form" method="POST" action="{{url('/')}}"
                              enctype="multipart/form-data">
                            {!! csrf_field() !!}
                            <div class="form-group">
                                <label for="pictures" class="col-md-2 control-label" id="message">
                                    图片*
                                </label>
                                <div class="col-md-5">
                                    <input accept="image/*" type="file" id="avatar" style="margin-top: 10px;"
                                           name="avatar">
                                </div>
                                <button class="btn btn-info" type="submit">确定</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <script src="http://malsup.github.com/jquery.form.js"></script>
    <script>

        $(document).ready(function () {
            var options = {
                beforeSubmit: showRequest,
                success: showResponse,
                dataType: 'json'
            };
            $('#avatar').on('change', function () {
                console.log('change')
                $('#message').html('正在上传...');
                $('#avatar_upload').ajaxForm(options).submit();
            });
            function showRequest() {

                return true;
            }

            function showResponse(response) {
                console.log(response)
                if(response.success)
                {
                    $('#message').html('上传成功');
                }
                else
                {
                    $('#message').html('上传失败');
                }
            }

        })
    </script>
@endsection