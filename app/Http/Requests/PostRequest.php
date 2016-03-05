<?php

namespace App\Http\Requests;

use EndaEditor;
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
            'content_markdown'=>'required'
        ];
    }

    public function creatingData()
    {
        return [
            'title'=>$this['title'],
            'content_markdown'=>$this['content_markdown'],
            'content_html' => markdown2Html($this['content_markdown']),
            'user_id'=>Auth::id(),
        ];
    }
    public function updatingData()
    {
        return [
            'title'=>$this['title'],
            'content_markdown'=>$this['content_markdown'],
            'content_html' => markdown2Html($this['content_markdown']),
        ];
    }
}
