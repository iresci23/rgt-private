@extends('voyager::master')

@section('page_title', __('voyager.generic.view').' Requirements')

@section('breadcrumbs')

@include('projects.header', ['project_name' => $Project->name])

@section('content')
  <project-page active="Requirements" id="{{ $Project->id }}"></project-page>
@stop

@section('head')
<script src="/js/ckeditor5/build/ckeditor.js"></script>
@stop