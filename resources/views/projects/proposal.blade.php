@extends('voyager::master')

@section('page_title', __('voyager.generic.view').' Proposal')

@section('breadcrumbs')

@include('projects.header', ['project_name' => $Project->name])

@section('content')
  <project-page active="Proposal" id="{{ $Project->id }}" name="{{ $Project->name }}"></project-page>
@stop

@section('head')
<script src="/js/ckeditor5/build/ckeditor.js"></script>
@stop