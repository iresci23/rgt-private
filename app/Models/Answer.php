<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;


class Answer extends Model
{
    use SoftDeletes;

    protected $guarded = [
    	'id'
    ];

    protected static function boot()
	{
	    parent::boot();
	 
	    /* By default, we exclude the widget's answers */
        
	    static::addGlobalScope('mainAnswer', function (Builder $builder) {
	        $builder->whereNull('parent_id');
	    });
	}

    public function scopeAnswerByProject($query, $project_id, $question_id)
    {
    	return $query->where('project_id', $project_id)->where('question_id', $question_id);
    }
}
