<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

/**
 * @property mixed user_id
 * @property mixed view_count
 */
class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'content_raw',
        'content_html',
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function visitorRegistries()
    {
        return $this->hasMany('App\VisitorRegistry');
    }

    /**
     * 查看此IP是否查看过次文章，没有的话记录加1，有的话什么也不执行
     * @param $ip
     */
    public function checkIP($ip)
    {
        if($this->visitorRegistries()->where('ip',$ip)->count() == 0)
        {
            $this->visitorRegistries()->save(VisitorRegistry::create(['ip'=>$ip]));
            DB::table('posts')->where('id',$this->id)->increment('view_count');
            ++$this->view_count;
        }
    }
}
