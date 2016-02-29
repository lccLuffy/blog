@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="{{ asset('css/jquery.Jcrop.min.css') }}">
@endsection
@section('content')
    <div class="jumbotron">
        <div class="text-center">
            <img src="{{ $user->avatar ? $user->avatar : 'http://localhost:8000/images/image.png' }}"
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
            <button class="btn btn-info" type="submit">确定</button>
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
                <div class="modal-body" style="height:500px;">
                    <div class="js-img"></div>
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
            var file = FileAPI.getFiles(evt)[0]; // Retrieve file list
            console.log(file)
            $('#cropper-preview').modal('show')
            $('.js-img').cropper({
                file: file,
                aspectRatio: 1,
                onSelect: function (coords) {
                    $('#upload_avatar').fileapi('crop', file, coords);
                }
            })

        });


        /*$('#cropper-preview').on('click', '.js-upload', function (){
         $('#upload_avatar').fileapi('upload');
         $('#cropper-preview').modal('hide');
         });

         $('#upload_avatar').fileapi({
         url: "http://www.baidu.com",
         accept: 'image/!*',
         imageSize: {minWidth: 100, minHeight: 100},
         elements: {
         active: {show: '.js-upload', hide: '#upload_avatar'},
         preview: {
         el: '.js-preview',
         width: 96,
         height: 96
         },
         },
         onSelect: function (evt, ui) {
         var file = ui.all[0];
         if (file) {
         $('#cropper-preview').modal('show').on('shown.bs.modal', function () {
         $('.js-img').cropper({
         file: file,
         bgColor: '#fff',
         maxSize: [$('#cropper-preview .modal-body').width() - 40, $(window).height() - 100],
         minSize: [100, 100],
         selection: '90%',
         aspectRatio: 1,
         onSelect: function (coords) {
         $('#upload_avatar').fileapi('crop', file, coords);
         }
         });
         });
         }
         },
         onComplete: function(evt, xhr)
         {
         try {
         var result = FileAPI.parseJSON(xhr.xhr.responseText);
         $('#avatar-hidden').attr("value",result.images.filename);
         } catch (er){
         FileAPI.log('PARSE ERROR:', er.message);
         }
         }
         })*/


        $(document).ready(function () {
            var options = {
                beforeSubmit: showRequest,
                success: showResponse,
                dataType: 'json'
            };
            $('#avatar').on('change', function () {

                /*$('#message').html('正在上传...');*/
                /*$('#avatar_upload').ajaxForm(options).submit();*/
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

        })
    </script>

@endsection