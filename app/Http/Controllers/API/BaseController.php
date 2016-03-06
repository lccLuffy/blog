<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Dingo\Api\Routing\Helpers;

class BaseController extends Controller
{
    use Helpers;

    public function wrapArray($results, $error = false, $message = '')
    {
        return ['error' => $error, 'message' => $message, 'results' => $results];
    }
}
