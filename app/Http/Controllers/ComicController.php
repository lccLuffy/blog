<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Yangqi\Htmldom\Htmldom;

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

    /**
     * @param $ClassifyId
     * @return $this
     */
    public function index($ClassifyId)
    {
        $title = '';
        switch($ClassifyId)
        {
            case 0:
                $title='热血';
                break;
            case 2:
                $title='同人';
                break;
            case 3:
                $title='鼠绘';
                break;
            default:
                abort(404);
        }
            $page = request('page',0);
            try{
                $jsonObj = json_decode(file_get_contents(ComicController::GET_BOOK_BY_PARAM.'?ClassifyId='.$ClassifyId.'&PageIndex='.$page));
                $comics = $jsonObj->Return->List;
                if(count($comics)<1)
                {
                    return back()->withErrors('没有更多了');
                }
            }
            catch(\Exception $e)
            {
                abort(503,$e->getMessage());
        }

        return view('comic.index')->with(compact('title','comics','page'));
    }

    /**
     * @param $id
     * @param $title
     * @return $this
     */
    public function chapter($id,$title)
    {
        $page = request('page',0);
        try{
            $jsonObj = json_decode(file_get_contents(ComicController::GET_COMIC_BOOK_DATA.'?id='.$id.'&PageIndex='.$page));
            $chapters = $jsonObj->Return->List;
            if(count($chapters)<1)
            {
                return back()->withErrors('没有更多了');
            }
        }
        catch(\Exception $e)
        {
            abort(503,$e->getMessage());
        }
        return view('comic.chapter')->with(compact('title','chapters','page'));
    }

    /**
     * @param $id
     * @param $title
     * @return $this
     */
    public function images($id,$title)
    {
        try{
            $html = file_get_contents(ComicController::URL_IMG_CHAPTER.$id);
            $dom = new Htmldom($html);
            $images=[];
            foreach($dom->find('img') as $element)
                $images[]= $element->src;
        }
        catch(\Exception $e)
        {
            abort(503);
        }
        return view('comic.images')->with(compact('images','title'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function onepieceParse()
    {
        $html = file_get_contents('http://www.4399dmw.com/haizeiwang/juqing/');
        $dom = new Htmldom($html);
        $list = $dom->find('div.g_articlelist li');
        $items = [];
        foreach($list as $li)
        {
            $item = [];
            $item['src'] = $li->find('img', 0)->src;
            $item['title'] = $li->find('h3', 0)->plaintext;
            $item['description'] = $li->find('p', 0)->plaintext;
            $item['href'] = 'http://www.4399dmw.com'.$li->find('a', 0)->href;
            $items[]=$item;
        }
        return view('comic.parse_list',compact('items'));
    }
}
