<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use League\Fractal\Resource\Item;
use Spatie\Fractalistic\ArraySerializer;

use App\Models\UseCase;

class UseCaseTransformer extends TransformerAbstract
{
    protected $with_estimates;

    protected $defaultIncludes = [
        'children_recursive'
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(UseCase $model)
    {
        if ( $model ) {
            return [
                'id' => $model->id,
                'parent_id' => $model->parent_id,
                'component_id' => $model->component_id,
                'project_id' => $model->project_id,
                'name' => $model->name,
                'sort_order' => $model->sort_order,
                'estimate' => $this->with_estimates ? $model->estimate : []
            ];
        }

        return [];
    }

    /**
     * Include children
     *
     * @param App\Survey $survey
     * @return League\Fractal\CollectionResource
     */
    public function includeChildrenRecursive(UseCase $model)
    {
        if ( $model->childrenRecursive ) {
            return $this->collection($model->childrenRecursive, new UseCaseTransformer);
        }

        return null;
    }
    
    public function setWithEstimates($value)
    {
        $this->with_estimates = $value;

        return $this;
    }
}
