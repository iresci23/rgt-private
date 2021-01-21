<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class SystemUseCase extends Model
{
    public function parent()
    {
        return $this->belongsTo(SystemUseCase::class,'parent_id');
    }

    public function children()
    {
        return $this->hasMany(SystemUseCase::class, 'parent_id');
    }

    // recursive, loads all descendants
    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }
}
