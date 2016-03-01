@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="{{ asset('css/jquery.Jcrop.min.css') }}">
@endsection
@section('content')
    <div class="jumbotron">
        <div class="text-center">
            <img src="{{ $user->avatar ? $user->avatar : asset('images/image.png') }}"
                 class="img-circle img-thumbnail" style="width: 128px;">
            <p class="lead">{{ $user->username }}</p>
            <p>
                <small>description</small>
            </p>
            <p>
                <small><i>文章数：{{ $user->posts()->count() }}</i></small>
            </p>
        </div>
    </div>


    <form id="avatar_upload" method="POST" action="{{route('user.uploadAvatar')}}"
          enctype="multipart/form-data">
        {!! csrf_field() !!}
        <div class="form-group">
            <label id="message">
                图片*
            </label>
            <div id="upload_avatar">
                <input type="file" id="avatar" style="margin-top: 10px;"
                       name="avatar">
            </div>
            <div class="js-upload" style="display: none;">
                <div class="progress">
                    <div class="js-progress bar"></div>
                </div>
                <span class="btn-txt">
                    正在上传...
                </span>
            </div>
        </div>

    </form>


    <div class="modal fade" id="cropper-preview">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">裁剪图片</h4>
                </div>
                <div class="modal-body" id="modal_body" style="height:500px;">
                    <div id="image_wrapper">
                    </div>
                </div>
                <div class="modal-footer">
                    <p>
                    <div class="js-upload btn btn-primary">上传</div>
                    </p>
                </div>
            </div>
        </div>
    </div>







@endsection
@section('scripts')
    <script src="http://oss.maxcdn.com/jquery.form/3.50/jquery.form.min.js"></script>

    <script src="{{ asset('js/uploader/FileAPI.min.js') }}"></script>
    <script src="{{ asset('js/uploader/FileAPI.exif.js') }}"></script>
    <script src="{{ asset('js/uploader/jquery.fileapi.js') }}"></script>
    <script src="{{ asset('js/uploader/jquery.Jcrop.min.js') }}"></script>


    <script>

        var avatar = document.getElementById('avatar');

        FileAPI.event.on(avatar, 'change', function (evt) {
            console.log('change')
            var files = FileAPI.getFiles(evt); // Retrieve file list

            FileAPI.filterFiles(files, function (file, info) {
                        if (!/^image/.test(file.type)) {
                            alert('图片格式不正确');
                            return false;
                        }
                        else if (file.size > 500 * FileAPI.KB) {
                            alert('图片必须小于500K');
                            return false;
                        }
                        return true;
                    },
                    function (files, rejected) {
                        var file = files[0]
                        $('#cropper-preview').modal('show')
                        $('#image_wrapper').cropper({
                            file:file,
                            bgColor: '#fff',
                            /*maxSize: [$('#modal_body').width()-40, $(window).height()-100],*/
                            minSize: [100, 100],
                            selection: '90%',
                            aspectRatio: 1,
                            onSelect: function (coords){
                                $('#image_wrapper').fileapi('crop', file, coords);
                            }

                        })


                    });

        });

        /*  $(document).ready(function () {
         var options = {
         beforeSubmit: showRequest,
         success: showResponse,
         dataType: 'json'
         };
         $('#avatar').on('change', function () {

         /!*$('#message').html('正在上传...');*!/
         /!*$('#avatar_upload').ajaxForm(options).submit();*!/
         });
         function showRequest() {
         return true;
         }

         function showResponse(response) {
         console.log(response)
         if (response.success) {
         $('#message').html('上传成功');
         }
         else {
         $('#message').html(response.message);
         }
         }

         })*/
    </script>

@endsection