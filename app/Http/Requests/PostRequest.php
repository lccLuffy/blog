<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Auth;

class PostRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'=>'required|max:255',
            'content'=>'required'
        ];
    }

    public function postData()
    {
        return [
            'title'=>$this['title'],
            'content'=>$this['content'],
            'user_id'=>Auth::id(),
        ];
    }
}
