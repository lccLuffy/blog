<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VisitorRegistry extends Model
{
    protected $fillable = ['ip','clicks'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function posts()
    {
        return $this->belongsTo('App\Post');
    }
}
