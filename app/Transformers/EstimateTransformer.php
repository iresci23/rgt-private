<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;

use App\Models\Estimate;

class EstimateTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'parent',
    ]; 
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Estimate $model)
    {
        if ( $model ) {
            return [
                'id' => $model->id,
                'project_id' => $model->project_id,
                'component_id' => $model->component_id,
                'use_case_id' => $model->use_case_id,
                'scope' => $model->scope,
                'ba_hours' => $model->ba_hours,
                'dev_hours' => $model->dev_hours,
                'qa_hours' => $model->qa_hours,
                'pm_hours' => $model->pm_hours,
                'notes' => $model->notes
            ];
        }

        return [];
    }

    public function includeParent(Estimate $model)
    {
        if ( $model->parent ) {

            return $this->item($model->parent, new EstimateTransformer);
        }
    }
}
