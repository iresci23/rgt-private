<nav class="navbar navbar-default navbar-fixed-top navbar-top">
    <div class="container-fluid">
        <div class="navbar-header">

            <a class="navbar-brand hidden-xs" href="{{ route('voyager.dashboard') }}">
                <div class="logo-icon-container">
                    <?php $admin_logo_img = Voyager::setting('admin.icon_image', ''); ?>
                    @if($admin_logo_img == '')
                        <img src="{{ voyager_asset('images/logo-icon-light.png') }}" alt="Logo Icon">
                    @else
                        <img src="{{ Voyager::image($admin_logo_img) }}" alt="Logo Icon">
                    @endif
                </div>
                <!-- <div class="title">{{Voyager::setting('admin.title', 'RGT')}}</div> -->
            </a>

        <!-- PRIMARY NAV -->
        @php
            $nav_items = json_decode(menu('topnav','_json')); 
        @endphp

        <ul class="nav navbar-nav @if (__('voyager::generic.is_rtl') == 'true') navbar-left @else navbar-right @endif hidden-xs">
            @if (is_array($nav_items))
            @foreach( $nav_items as $nav)
                <li class="@if(isset($dataType) && isset($dataType->slug) && '/app/'.$dataType->slug == $nav->url){{ 'active' }}@endif">
                    <a href="{!! $nav->url !!}">
                        <i class="{!! $nav->icon_class !!}"></i>
                        <span>{!! trim($nav->title) !!}</span>
                    </a>
                </li>
            @endforeach
            @endif
            <li>
                <ul class="nav navbar-nav">
                    <li class="dropdown profile">
                        <a href="#" class="dropdown-toggle text-right" data-toggle="dropdown" role="button"
                        aria-expanded="false"><img src="{{ $user_avatar }}" class="profile-img"> <span
                                    class="caret"></span></a>
                        <ul class="dropdown-menu dropdown-menu-animated">
                            <li class="profile-img">
                                <img src="{{ $user_avatar }}" class="profile-img">
                                <div class="profile-body">
                                    <h5>{{ Auth::user()->name }}</h5>
                                    <h6>{{ Auth::user()->email }}</h6>
                                </div>
                            </li>
                            <li class="divider"></li>

                            <li class="class-full-of-rum">
                                <a href="/app/profile">
                                    <i class="voyager-person"></i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            
                            <!-- Show superadmin links -->
                            @if(\Auth::user()->hasRole('admin'))
                            <li class="class-full-of-rum">
                                <a href="/app/setup">
                                    <i class="voyager-settings"></i>
                                    <span>Manage</span>
                                </a>
                            </li>
                            @endif

                            <li>
                                <form action="{{ route('voyager.logout') }}" method="POST">
                                    {{ csrf_field() }}
                                    <button type="submit" class="btn btn-danger btn-block">
                                        <i class=""></i>
                                        Logout
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>

        <!-- <button class="hamburger btn-link">
            <span class="hamburger-inner"></span>
        </button> -->

        </div>

    </div>
</nav>
