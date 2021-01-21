<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UseCase extends Model
{
    use SoftDeletes;

    protected $fillable = ['name','component_id','project_id','parent_id','status','sort_order'];

    public static function boot()
    {
        parent::boot();

        static::creating( function($model) {
            $model->created_by = \Auth::id();
        });

        static::deleting( function($model) { // before delete() method call this
            \Schema::disableForeignKeyConstraints();
            $model->children()->delete();
        });

        static::deleted( function($model) { // after delete() method call this
            \Schema::enableForeignKeyConstraints();
        });
    }

    public function parent()
    {
        return $this->belongsTo(UseCase::class,'parent_id');
    }

    public function children()
    {
        return $this->hasMany(UseCase::class, 'parent_id')
                    ->orderByRaw('sort_order = 0', 'ASC', 'sort_order'); //put 0 on last
    }

    // recursive, loads all descendants
    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }
    
    public function estimate()
    {
        return $this->hasOne(Estimate::class, 'use_case_id');
    }
}
