@extends('voyager::master')

@section('page_title', __('voyager.generic.viewing').' '.$dataType->display_name_plural)

@section('page_header')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="{{ $dataType->icon }}"></i> {{ $dataType->display_name_singular }} Overview
        </h1>
        <span class="page-buttons">
            <a href="javascript:;" @click="$root.$refs.refProjectForm.set(0).open()" class="btn btn-primary btn-add-new">
                <i class="voyager-plus"></i> <span>New Project</span>
            </a>
        </span>
    </div>
@stop

@section('content')
    <div class="page-content browse container-fluid">

    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-bordered theme-panel">
                <div class="panel-body">
                    <project-list></project-list>
                </div>
            </div>
        </div>
    </div>
        <!-- Modals -->
        <project-form ref="refProjectForm"></project-form>
    </div>
@stop

@section('css')
    <link rel="stylesheet" href="/css/ag-grid.min.css">
    <link rel="stylesheet" href="/css/ag-theme-alpine.min.css">
@stop