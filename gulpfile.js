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
    /*mix.sass('app.scss');

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
    ],'public/js/simditor.js');*/

    /**
     * styles 与 scrtips 方法可以通过传入第三个参数来决定来源文件的相对目录。
     */
    /*mix.styles([
        "bootstrap.min.css",
        "clndr.css",
        "custom.css",
        "font-awesome.css",
        "jqvmap.css",
        "lines.css",
        "style.css"
    ], 'public/css/web/theme.css', 'resources/assets/web/css');*/
    /*mix.scripts([
        'custom.js',
        'site.js',
        'Chart.js',
        'clndr.js',
        'd3.v3.js',
        'metisMenu.min.js',
        'moment-2.2.1.js',
        'rickshaw.js',
        'underscore-min.js',
    ],'public/js/web/theme.js','resources/assets/web/js');
    mix.version(['public/css/web/theme.css','public/js/web/theme.js','css/app.css','css/simditor/app.css','js/simditor.js']);*/
    /*mix.version(['css/app.css','css/simditor/app.css','js/simditor.js']);*/
});

