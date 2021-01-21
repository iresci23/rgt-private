<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

use App\Models\Answer;

class AnswerTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($model)
    {
        if ( $model ) {
            return [
                'id' => $model['id'],
                'answer' => $model['answer'],
                'project_id' => $model['project_id']
            ];
        }

        return [];
    }
}
