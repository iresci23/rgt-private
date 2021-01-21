<?php

namespace App\Transformers;

use Illuminate\Support\Collection;

use League\Fractal\TransformerAbstract;

use App\Models\TargetGroup;

class WidgetTransformer extends TransformerAbstract
{

    protected $params;

    public function __construct($params) {
         $this->params = $params;
    }

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($widget)
    {
        if ($this->params->widget == 'TargetGroupWidget'){

            return [
                'id'    => $widget->id,
                'name'  => $widget->name,
                'user_able_to_do' => null,
                'user_access_to' => null,
                'user_main_actions' => null,
                'demographics'  => [
                    'age'       => $widget->age,
                    'location'  => $widget->location,
                    'gender'    => $widget->gender,
                    'income_level'      => $widget->income_level,
                    'occupation'        => $widget->occupation,
                    'education_level'   => $widget->education_level
                ],
                'psychographics' => [
                    'personality' => $widget->personality,
                    'interest'    => $widget->interest
                ]
            ];
        }

        return [];
    }
}
