<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $dates = [
        'created_at',
        'archived_at',
    	'deleted_at'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d',
    ];

    protected $appends = [
    ];

    protected $guarded = ['id'];

	/**
	 * Return data of active projects
	 * @param $query
	 * @return Builder
	 */
    public function scopeOnlyActive($query)
    {
    	return $query->whereNull('archived_at');
    }

	/**
	 * Return data of archived projects
	 * @param $query
	 * @return Builder
	 */
    public function scopeOnlyArchived($query)
    {
    	return $query->whereNotNull('archived_at');
    }

    public function scopeWithActive($query)
    {
    	return $query->where(function ($q) {
            $q->whereNull('archived_at')
              ->whereNull('deleted_at');
        });
    }

    public function scopeWithArchived($query)
    {
    	return $query->OrWhereNotNull('archived_at');
    }

    public function scopeWithDeleted($query)
    {
        return $query->withoutGlobalScopes()
                     ->OrWhereNotNull('deleted_at');
    }

    public function scopeWhereKeyword($query, $keyword)
    {
        return $query->where( function ($q) use ($keyword) {
            $q->where('name', 'like', '%' . $keyword . '%');
        });
    }

    /*=================================
    =            Relations            =
    =================================*/
    
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function type()
    {
        return $this->belongsTo(ProjectType::class);
    }

    public function status()
    {
        return $this->belongsTo(ProjectStatus::class);
    }

    public function targetGroups()
    {
        return $this->hasMany(TargetGroup::class)->orderBy('sort_order');
    }

    public function components()
    {
        return $this->hasMany(Component::class, 'project_id')->orderBy('sort_order');
    }

    
    /*=====  End of Relations  ======*/
    

}
