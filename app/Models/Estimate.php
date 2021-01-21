<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estimate extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    public static function boot()
    {
        parent::boot();

        static::creating( function($model) {
            $model->created_by = \Auth::id();
        });

        static::updating( function($model) {
            $model->updated_by = \Auth::id();
        });

    }

    public function scopeOfProject($query, $project_id)
    {
        return $query->where('project_id', $project_id);
    }

    /** Get the "parent" component */
    public function parent()
    {
        return $this->hasOne(Estimate::class,'component_id','component_id')->whereNull('use_case_id');
    }

    public function siblings()
    {
        return $this->hasMany(Estimate::class,'component_id','component_id')->whereNotNull('use_case_id');
    }
}
