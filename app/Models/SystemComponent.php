<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\SystemUseCase;

class SystemComponent extends Model
{
    public function useCases()
    {
        return $this->hasMany(SystemUseCase::class, 'component_id');
    }

    public function useCasesTree()
    {
        return $this->useCases()
                    ->with('childrenRecursive')
                    ->whereNull('parent_id')
                    ->get();
    }
}
