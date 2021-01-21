@extends('voyager::master')

@section('page_title', __('voyager.generic.view').' Project Sales')

@section('breadcrumbs')

@include('projects.header', ['project_name' => $Project->name])

@section('content')
  <project-page active="Sales" id="{{ $Project->id }}"></project-page>
@stop