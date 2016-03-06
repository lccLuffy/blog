<?php
/**
 * Created by PhpStorm.
 * User: lcc_luffy
 * Date: 2016/2/27
 * Time: 21:58
 */

/**
 *
 *
 * @param $string
 * @param $length
 * @param string $suffix
 * @return string
 */

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

function fetchDescription($string, $length, $suffix = '...')
{
    $resultString = '';
    $string = html_entity_decode(trim(strip_tags($string)), ENT_QUOTES, 'UTF-8');
    $strLength = strlen($string);
    for ($i = 0; (($i < $strLength) && ($length > 0)); $i++) {
        if ($number = strpos(str_pad(decbin(ord(substr($string, $i, 1))), 8, '0', STR_PAD_LEFT), '0')) {
            if ($length < 1.0) {
                break;
            }
            $resultString .= substr($string, $i, $number);
            $length -= 1.0;
            $i += $number - 1;
        } else {
            $resultString .= substr($string, $i, 1);
            $length -= 0.5;
        }
    }
    $resultString = htmlspecialchars($resultString, ENT_QUOTES, 'UTF-8');
    if ($i < $strLength) {
        $resultString .= $suffix;
    }
    return $resultString;
}

/**
 * @return string
 */
function defaultAvatar()
{
    return asset('images/image.png');
}

/**
 * @param $pictureName
 * @param $file
 * @param bool $getUrl
 * @return bool
 */
function uploadPicture($pictureName, $file, $getUrl = true)
{
    $content = File::get($file->getRealPath());

    $disk = Storage::disk('qiniu');

    if ($disk->put($pictureName, $content)) {
        return $getUrl ? $disk->getDriver()->downloadUrl($pictureName) : true;
    }
    return false;
}

/**
 * {#202 ▼
 * +"code": 0
 * +"data": {#203 ▼
 * +"country": "中国"
 * +"country_id": "CN"
 * +"area": "西南"
 * +"area_id": "500000"
 * +"region": "四川省"
 * +"region_id": "510000"
 * +"city": "成都市"
 * +"city_id": "510100"
 * +"county": ""
 * +"county_id": "-1"
 * +"isp": "教育网"
 * +"isp_id": "100027"
 * +"ip": "202.115.13.157"
 * }
 * }
 * @param $ip
 * @return mixed
 */
function ipLocation($ip)
{
    return json_decode(file_get_contents('http://ip.taobao.com/service/getIpInfo.php?ip=' . $ip));
}


/**
 * @param $raw
 * @return string
 */
function markdown2Html($raw)
{
    return Parsedown::instance()->text($raw);
}

function apiRoute($name,$version = 'v1')
{
    return app('Dingo\Api\Routing\UrlGenerator')->version($version)->route('api.'.$name);
}