<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TimelineCost extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $table = 'timeline_cost';

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

    public function scopeComponentByScope($query, $project_id, $component_id, $scope)
    {
        return $query->where('project_id', $project_id)
                     ->where('component_id', $component_id)
                     ->where('scope', $scope);
    }

    public function scopeOfProject($query, $project_id)
    {
        return $query->where('project_id', $project_id);
    }

    public function component()
    {
        return $this->belongsTo(Component::class,'component_id');
    }
}
