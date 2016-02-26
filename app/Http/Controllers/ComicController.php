<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ComicController extends Controller
{
    const APP_HTTP = "http://www.ishuhui.net";

    const GET_NEW_BOOK = "http://www.ishuhui.net/ComicBooks/GetLastChapterForBookIds?idJson=[1,2,3]";

    const URL_IMG_CHAPTER = "http://www.ishuhui.net/ReadComicBooksToIso/";

    /**
     * 订阅漫画
     * isSubscribe  true/false
     * bookid       Id
     */

    const SUBSCRIBE = "http://www.ishuhui.net/Subscribe";

    /**
     * 获取用户订阅的漫画
     */
    const GET_SUBSCRIBE_BOOK = "http://www.ishuhui.net/ComicBooks/GetSubscribe";
    /**
     * 获取具体漫画的章节列表
     * id           漫画的Id
     * PageIndex    获取第几页的数据
     */
    const GET_COMIC_BOOK_DATA = "http://www.ishuhui.net/ComicBooks/GetChapterList";

    /**
     * 获取某一分类30条记录
     * ClassifyId   分类标识，0热血，1国产，2同人，3鼠绘
     * Size         每次获取的消息条数，最大值为30
     * PageIndex    获取第几页的数据
     * Title        搜索动漫数据,URLDecoder.decode(Title, "UTF-8")
     */
    const GET_BOOK_BY_PARAM = "http://www.ishuhui.net/ComicBooks/GetAllBook";
    /**
     * 获取幻灯片接口
     */
    const GET_SLIDE_DATA = "http://two.ishuhui.com/imgs.html";
    const URL_USER_LOGIN = "http://www.ishuhui.net/UserCenter/Login";
    const URL_USER_REGISTER = "http://www.ishuhui.net/UserCenter/Regedit";
}
