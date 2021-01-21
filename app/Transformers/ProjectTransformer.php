<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

use App\Models\Project;

class ProjectTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Project $model)
    {

        $state = 'Active';

        if (!$model->deleted_at && $model->archived_at) { 
            $state = 'Archived';
        } else if ($model->deleted_at) {
            $state = 'Deleted';
        }

        return [
            'id'            => $model->id,
            'name'          => $model->name,
            'type_id'       => $model->type_id,
            'type'          => $model->type,
            'client'        => $model->client,
            'status'        => $model->status,
            'ba_rate'       => $model->ba_rate,
            'dev_rate'      => $model->dev_rate,
            'qa_rate'       => $model->qa_rate,
            'pm_rate'       => $model->pm_rate,
            'created_at'    => $model->created_at->format('m/d/Y'),
            'archived_at'   => $model->archived_at,
            'deleted_at'    => $model->deleted_at,
            'state'         => $state
        ];
    }
}
