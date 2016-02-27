var elixir = require('laravel-elixir');
var gulp = require('gulp');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

    mix.sass(['editor.scss','fonticon.scss','simditor.scss','simditor-html.scss'],'public/css/simditor');

    mix.scripts([
        'simditor/module.js',
        'simditor/hotkeys.js',
        'simditor/uploader.js',
        'simditor/simditor.js',
        'simditor/marked.js',
        'simditor/simditor-marked.js',
        'simditor/beautify-html.js',
        'simditor/simditor-html.js'
    ],'public/js/simditor.js');




    mix.version(['css/app.css','css/simditor/app.css','js/simditor.js']);
});

