@extends('voyager::master')

@section('page_title', __('voyager.generic.viewing').' '.$dataType->display_name_plural)

@section('page_header')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="{{ $dataType->icon }}"></i> {{ $dataType->display_name_singular }} Overview
        </h1>
        <span class="page-buttons">
        @can('add',app($dataType->model_name))
            <a href="javascript:;" @click="$root.$refs.refProjectForm.set(0).open()" class="btn btn-primary btn-add-new">
                <i class="voyager-plus"></i> <span>New Project</span>
            </a>
        @endcan
        </span>
    </div>
@stop

@section('content')
    <div class="page-content browse container-fluid">
        @include('voyager::alerts')
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered theme-panel">
                    <div class="panel-body">

                        <div class="mini-form-search col-md-5">
                            
                            <form method="get" class="form-search">
                                <div id="search-input">
                                    <div class="input-group col-md-12">
                                        <input type="hidden" name="key" value="name">
                                        <input type="hidden" name="filter" value="contains">
                                        <input type="text" class="form-control search-input" placeholder="Search" name="s" value="{{ $search->value }}">
                                        <span class="input-group-btn">
                                            <button class="btn btn-info btn-lg" type="submit">
                                                <i class="voyager-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div class="col-md-7">
                            <div class="dropdown pull-right">
                                <button 
                                id="moreOptions"
                                class="btn btn-xs btn-default dropdown-toggle"
                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="true">
                                      <i class="voyager-dot-3"></i>
                                  </button>
                                  <ul class="dropdown-menu more-options-dropdown" aria-labelledby="moreOptions">
                                    @if($status !== 'archived')
                                        @can('edit',app($dataType->model_name))
                                          <li>
                                            <bulk-archive slug="projects"></bulk-archive>
                                          </li>
                                        @endcan
                                    @endif
                                    @if($status !== 'deleted')
                                        @can('delete',app($dataType->model_name))
                                          <li>
                                            <bulk-delete slug="projects"></bulk-delete>
                                          </li>
                                        @endcan
                                    @endif
                                  </ul>
                            </div>
                            <ul class="nav nav-pills filter-pills pull-right">
                              <li role="presentation" class="{{ $status === 'active' ? 'active' : ''}}">
                                <a href="{{ route('Project.index', 'active')}}"><i class="voyager-check-circle"></i> Active</a>
                              </li>
                              <li role="presentation" class="{{ $status === 'archived' ? 'active' : ''}}">
                                <a href="{{ route('Project.index', 'archived')}}"><i class="voyager-archive"></i> Archived</a>
                              </li>
                              <li role="presentation" class="{{ $status === 'deleted' ? 'active' : ''}}">
                                <a href="{{ route('Project.index', 'deleted')}}"><i class="voyager-trash"></i> Deleted</a>
                              </li>
                            </ul>
                        </div>
                        <div class="table-responsive col-sm-12">

                            <table id="dataTable" class="table table-hover table-bordered theme-table">
                                <thead>
                                    <tr>
                                        @can('delete',app($dataType->model_name))
                                            <th>
                                                <input type="checkbox" class="select_all">
                                            </th>
                                        @endcan
                                        @foreach($dataType->browseRows as $row)
                                        <th>
                                            @if ($isServerSide)
                                                <a href="{{ $row->sortByUrl($orderBy, $sortOrder) }}">
                                            @endif
                                            {{ trim($row->getTranslatedAttribute('display_name')) }}
                                            @if ($isServerSide)
                                                @if ($row->isCurrentSortField($orderBy))
                                                    @if ($sortOrder == 'asc')
                                                        <i class="voyager-angle-up pull-right"></i>
                                                    @else
                                                        <i class="voyager-angle-down pull-right"></i>
                                                    @endif
                                                @endif
                                                </a>
                                            @endif
                                        </th>
                                        @endforeach
                                        <th class="actions text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($dataTypeContent as $data)
                                    <tr>
                                        <td>
                                            <input type="checkbox" name="row_id" id="checkbox_{{ $data->getKey() }}" value="{{ $data->getKey() }}">
                                        </td>
                                        @foreach($dataType->browseRows as $row)
                                            @php
                                            if ($data->{$row->field.'_browse'}) {
                                                $data->{$row->field} = $data->{$row->field.'_browse'};
                                            }
                                            @endphp
                                            <td>
                                                @if (isset($row->details->view))
                                                    @include($row->details->view, ['row' => $row, 'dataType' => $dataType, 'dataTypeContent' => $dataTypeContent, 'content' => $data->{$row->field}, 'action' => 'browse', 'view' => 'browse', 'options' => $row->details])
                                                @elseif($row->type == 'image')
                                                    <img src="@if( !filter_var($data->{$row->field}, FILTER_VALIDATE_URL)){{ Voyager::image( $data->{$row->field} ) }}@else{{ $data->{$row->field} }}@endif" style="width:100px">
                                                @elseif($row->type == 'relationship')
                                                    @include('voyager::formfields.relationship', ['view' => 'browse','options' => $row->details])
                                                @elseif($row->type == 'date' || $row->type == 'timestamp')
                                                    @if ( property_exists($row->details, 'format') && !is_null($data->{$row->field}) )
                                                        {{ \Carbon\Carbon::parse($data->{$row->field})->formatLocalized($row->details->format) }}
                                                    @else
                                                        {{ $data->{$row->field} }}
                                                    @endif
                                                @elseif($row->field == 'name')
                                                    <a href="{{ route('Project.sales', $data->id) }}">{{ $data->name }}</a>
                                                @else
                                                    @include('voyager::multilingual.input-hidden-bread-browse')
                                                    <span>{{ $data->{$row->field} }}</span>
                                                @endif
                                            </td>
                                        @endforeach
                                        <td class="no-sort no-click bread-actions">

                                        @can('edit', $data)

                                            @if($status === 'active')
                                                <a href="javascript:;" @click="$root.$refs.refProjectForm.set({{$data->id}}).open()">
                                                    <i class="voyager-edit" title="Edit Project"></i>
                                                </a>
                                            @else
                                                <button-restore 
                                                id="{{ $data->id }}"
                                                label="{{ $data->name }}"
                                                slug="projects"
                                                status="{{ $status }}"></button-restore>
                                            @endif

                                        @endcan
                                            
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                        @if ($isServerSide)
                            <div class="pull-left">
                                <div role="status" class="show-res" aria-live="polite">{{ trans_choice(
                                    'voyager::generic.showing_entries', $dataTypeContent->total(), [
                                        'from' => $dataTypeContent->firstItem(),
                                        'to' => $dataTypeContent->lastItem(),
                                        'all' => $dataTypeContent->total()
                                    ]) }}</div>
                            </div>
                            <div class="pull-right">
                                {{ $dataTypeContent->appends([
                                    's' => $search->value,
                                    'filter' => $search->filter,
                                    'key' => $search->key,
                                    'order_by' => $orderBy,
                                    'sort_order' => $sortOrder,
                                ])->links() }}
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modals -->
    <project-form ref="refProjectForm"></project-form>
@stop

@section('css')
@if(!$dataType->server_side && config('dashboard.data_tables.responsive'))
<link rel="stylesheet" href="{{ voyager_asset('lib/css/responsive.dataTables.min.css') }}">
@endif
@stop

@section('javascript')
    <!-- DataTables -->
    @if(!$dataType->server_side && config('dashboard.data_tables.responsive'))
        <script src="{{ voyager_asset('lib/js/dataTables.responsive.min.js') }}"></script>
    @endif
    <script>
        $(document).ready(function () {
            @if (!$dataType->server_side)
                var table = $('#dataTable').DataTable({!! json_encode(
                    array_merge([
                        "order" => [],
                        "language" => __('voyager.datatable'),
                    ],
                    config('voyager.dashboard.data_tables', []))
                , true) !!});
            @else
                $('#search-input select').select2({
                    minimumResultsForSearch: Infinity
                });
            @endif

            @if ($isModelTranslatable)
                $('.side-body').multilingual();
            @endif
        });
    </script>
@stop