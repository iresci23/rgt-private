<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/login', function() {
	return redirect('/app/login');
})->name('login');

Route::group(['prefix' => 'app'], function () {
	
	Route::group(['middleware' => ['auth']], function () {

		Route::redirect('/', '/app/projects');

		Route::group(['prefix' => 'projects'], function () {

			Route::get('/', 'ProjectController@index')->name('Project.index');

			Route::get('/all','ProjectController@all')->name('Project.all');
			Route::get('/get/{id}','ProjectController@get')->name('Project.get');
			Route::post('/save','ProjectController@save')->name('Project.save');
			Route::post('/save-rates','ProjectController@saveRates')->name('Project.saveRates');
			Route::post('/archive','ProjectController@archive')->name('Project.archive');
			Route::patch('/{id}/restore','ProjectController@restore')->name('Project.restore');
			Route::delete('/','ProjectController@destroy')->name('Project.destroy');
			
			Route::group(['prefix' => '{id}'], function () {
				
				Route::get('/sales', 'SalesController@show')->name('Project.sales');
				Route::get('/requirements', 'RequirementController@show')->name('Project.requirements');
				Route::get('/proposal', 'ProposalController@show')->name('Project.proposal');

				Route::group(['prefix' => 'target-groups'], function () {
					Route::get('/all', 'SalesController@getTargetGroups')->name('Sales.TargetGroup.all');
					Route::post('/save', 'SalesController@saveTargetGroup')->name('Sales.TargetGroup.save');
				});

			});

			Route::get('/types','ProjectController@getTypes')->name('Project.Types');

		});

		Route::group(['prefix' => 'components'], function () {

			Route::get('/all', 'ComponentController@all')->name('Component.all');
			Route::post('/sort/{id}', 'ComponentController@sort')->name('Component.sort');
			Route::post('/duplicate', 'ComponentController@duplicate')->name('Component.duplicate');
			Route::post('/store', 'ComponentController@store')->name('Component.store');
			Route::post('/update/{id}', 'ComponentController@update')->name('Component.update');
			Route::delete('/{id}', 'ComponentController@delete')->name('Component.delete');
			
		});

		Route::group(['prefix' => 'use-cases'], function () {

			Route::get('/all', 'UseCaseController@all')->name('UseCase.all');
			Route::post('/sort/{id}', 'UseCaseController@sort')->name('UseCase.sort');
			Route::post('/duplicate', 'UseCaseController@duplicate')->name('UseCase.duplicate');
			Route::post('/store', 'UseCaseController@store')->name('UseCase.store');
			Route::post('/update/{id}', 'UseCaseController@update')->name('UseCase.update');
			Route::delete('/{id}', 'UseCaseController@delete')->name('UseCase.delete');
			
		});

		Route::group(['prefix' => 'estimates'], function () {

			Route::post('/save', 'EstimateController@save')->name('Estimate.save');
			Route::get('/time-and-cost', 'EstimateController@getTimeAndCost')->name('Estimate.timeAndCost');
			Route::post('/save-time-and-cost', 'EstimateController@saveTimeAndCost')->name('Estimate.saveTimeAndCost');
			Route::delete('/reset-time-and-cost', 'EstimateController@resetTimeAndCost')->name('Estimate.resetTimeAndCost');
			
		});

		Route::group(['prefix' => 'clients'], function () {

			Route::get('/all', 'ClientController@all')->name('Client.all');
			
		});

		Route::group(['prefix' => 'questions'], function () {

			Route::get('/all', 'QuestionController@all')->name('Question.all');
			Route::post('/sort/{id}', 'QuestionController@sort')->name('Question.sort');
			Route::post('/duplicate', 'QuestionController@duplicate')->name('Question.duplicate');
			Route::post('/update/{id}', 'QuestionController@update')->name('Question.update');
			Route::post('/store', 'QuestionController@store')->name('Question.store');
			Route::delete('/delete/{id}', 'QuestionController@delete')->name('Question.delete');
			
		});

		Route::group(['prefix' => 'answers'], function () {

			Route::post('/save', 'AnswerController@save')->name('Answer.save');
			
		});

		Route::group(['prefix' => 'media-mngr'], function () {

			Route::get('/by-project', 'MediaManagerController@byProject')->name('MediaManager.byProject');

			Route::delete('/', 'MediaManagerController@destroy')->name('MediaManager.delete');

			Route::post('/', 'MediaManagerController@store')->name('MediaManager.store');

			Route::post('/upload', 'MediaManagerController@upload')->name('MediaManager.upload');

			Route::post('/multiple', 'MediaManagerController@storeMultiple')->name('MediaManager.storeMultiple');

			Route::post('/update', 'MediaManagerController@update')->name('MediaManager.update');

			Route::group(['prefix' => 'directory'], function () {

				Route::post('/save', 'MediaManagerController@saveDirectory')->name('MediaManager.saveDirectory');

			});

			
		});


		Route::group(['prefix' => 'setup'], function () {

			Route::get('/', 'SetupController@index')->name('Setup.index');
			
		});

		Route::group(['prefix' => 'helper'], function () {

			Route::post('/sort', 'HelperController@saveSort')->name('Helper.sort');
			
		});

	});
	
	Voyager::routes();
   
	Route::get('/info', 'ProjectController@phpInfo');
});