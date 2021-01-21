<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Answer;
use App\Models\QuestionWidget;

class Question extends Model
{
    //
    use SoftDeletes;

    protected $guarded = ['id'];

    protected static function boot()
	{
	    parent::boot();
	 
	    /* Default order by sort_order ASC */
        
	    static::addGlobalScope('sortOrder', function (Builder $builder) {
	        $builder->orderBy('sort_order', 'asc');
	    });

        static::deleting( function($model) { // before delete() method call this
            \Schema::disableForeignKeyConstraints();
            $model->answers()->delete();
        });

        static::deleted( function($model) { // after delete() method call this
            \Schema::enableForeignKeyConstraints();
        });
	}

    /*==============================
    =            Scopes            =
    ==============================*/
    
    public function scopeFilterBySection($query, $section = 'sales-call')
    {
        return $query->where('section', $section);
    }

    public function scopeForProject($query, $project_id)
    {
        return $query->where('project_id', $project_id);
    }
    
    /*=====  End of Scopes  ======*/


    /*=================================
    =            Relations            =
    =================================*/
    
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function widgets()
    {
        return $this->hasMany(QuestionWidget::class);
    }
    
    /*=====  End of Relations  ======*/
    
    /*=================================
    =            Functions            =
    =================================*/

    public static function seedData($section, $project_id)
    {
        $items = config('seeds.'.str_replace('-','_', $section), []);

        foreach ($items as $item) {

            $personality_table = null;
            
            if ( $item['trigger_widget'] == 'personality-table-widget') {
                $personality_table = @serialize(config('seeds.personality_table', []));
            }

            $q = Question::create([
                'project_id' => $project_id,
                'question' => $item['name'],
                'section' => $section,
                'layout' => $item['layout'],
                'trigger_widget' => $item['trigger_widget'],
                'options' => $personality_table,
                'sort_order' => $item['sort_order'],
                'source' => 'system',
                'created_by' => \Auth::id()
            ]);

            if ( $q->id && $item['content'] ) {
                $newAnswer = new Answer;
                $newAnswer->question_id = $q->id;
                $newAnswer->project_id = $project_id;
                $newAnswer->answer = $item['content'];
                $newAnswer->layout = 'text-editor';
                $newAnswer->save();
            }
            
        }

        return new Question();
    }
}
