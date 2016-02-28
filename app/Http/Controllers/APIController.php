<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Tag;

class APIController extends Controller
{

    public function tags()
    {
        return response()->json(Tag::lists('name'));
    }
}
