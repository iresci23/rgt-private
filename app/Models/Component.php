<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Component extends Model
{
    use SoftDeletes;

    protected $fillable = ['name','sort_order','project_id'];

    public static function boot()
    {
        parent::boot();

        static::creating( function($model) {
            $model->created_by = \Auth::id();
            $model->source = 'user';
        });

        static::deleting( function($model) { // before delete() method call this
            \Schema::disableForeignKeyConstraints();
            $model->useCases()->delete();
        });

        static::deleted( function($model) { // after delete() method call this
            \Schema::enableForeignKeyConstraints();
        });
    }

    public function useCases()
    {
        return $this->hasMany(UseCase::class, 'component_id');
    }

    public function useCasesTree()
    {
        return $this->useCases()
                    ->with('childrenRecursive')
                    ->whereNull('parent_id')
                    ->get();
    }

    /** 
     * Total estimate of component
     * @return ResourceItem
     */
    public function estimate()
    {
        return $this->hasOne(Estimate::class, 'component_id')->whereNull('use_case_id');
    }

    /** 
     * Estimates of usecases in a componet 
     * @return ResourceCollection
     * */
    public function estimateDetails()
    {
        return $this->hasMany(Estimate::class, 'component_id')->whereNotNull('use_case_id');
    }
}
