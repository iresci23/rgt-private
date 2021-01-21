<?php

namespace App\Transformers;

use Illuminate\Support\Collection;

use League\Fractal\TransformerAbstract;

use App\Models\Question;

class QuestionTransformer extends TransformerAbstract
{

    protected $params;

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'answer'
    ];

    public function __construct($params) {
         $this->params = $params;
    }

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Question $model)
    {
        return [
            'id'            => $model->id,
            'question'      => $model->question,
            'name'          => $model->question,
            'layout'        => $model->layout,
            'trigger_widget'=> $model->trigger_widget != '0' ? $model->trigger_widget : null,
            'widgets'       => $model->widgets,
            'options'       => @unserialize($model->options),
            'sort_order'    => $model->sort_order
        ];
    }

    /**
     * Include Answer
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeAnswer(Question $model)
    {
        $answer = collect($model->answers)->firstWhere('project_id', $this->params->project_id);
    
        return $this->item($answer, new AnswerTransformer());
    }
}
