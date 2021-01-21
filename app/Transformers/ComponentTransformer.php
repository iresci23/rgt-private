<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;

use App\Models\Component;

class ComponentTransformer extends TransformerAbstract
{

    protected $with_estimates;

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'useCases',
        'estimate',
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Component $model)
    {
        if ( $model ) {
            return [
                'id' => $model->id,
                'project_id' => $model->project_id,
                'code' => $model->code,
                'name' => $model->name,
                'sort_order' => $model->sort_order,
                'source' => $model->source
            ];
        }

        return [];
    }
    
    /**
     * Include Usecases Array
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeUseCases(Component $model)
    {
        $transformer = new UseCaseTransformer();

        if ( $this->with_estimates ) {

            $transformer = $transformer->setWithEstimates(true);
        }

        return $this->collection($model->useCases, $transformer);
    }
    
    /**
     * Include Estimate of particular component
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeEstimate(Component $model)
    {
        if ( $model->estimate && $this->with_estimates ) {
            return $this->item($model->estimate, new EstimateTransformer());
        }
    }

    public function setWithEstimates($value)
    {
        $this->with_estimates = $value;

        return $this;
    }
}
