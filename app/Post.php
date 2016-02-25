<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property mixed user_id
 */
class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'user_id',
    ];

    protected $dates = ['deleted_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany('App\Tag','post_tag_pivot');
    }

    /**
     * @param array $tagNameArray
     */
    public function syncTags(array $tagNameArray)
    {
        $tagIds = [];
        foreach ($tagNameArray as $tag)
        {
            $t = Tag::firstOrCreate(['name' => $tag]);
            $tagIds[] = $t->id;
        }
        $this->tags()->sync($tagIds);
    }
}
