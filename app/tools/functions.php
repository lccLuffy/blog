<?php
/**
 * Created by PhpStorm.
 * User: lcc_luffy
 * Date: 2016/2/27
 * Time: 21:58
 */

/**
 * @param $str
 * @param $length
 * @return string
 */
function fetchDescription($str,$length)
{
    return substr($str,0,$length);
}