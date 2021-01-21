let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Asset Management - notes
 |--------------------------------------------------------------------------
 |
 | .extract() generates vendor.js and manifest.js, load these two files too from master.blade.php
 | Dynamic import is also active for this project ( import() ). See sample implementation at resources/assets/js/components/projects/requirements/TabMenu.vue
 | Code split the js when developing
 */
if (process.env.COMP_TYPE === 'css')
    mix.sass('resources/assets/sass/theme.scss', 'public/css');
else
    mix.js('resources/assets/js/components.js', 'public/js')
         .extract([
            'vue', 
            'jquery', 
            'lodash', 
            'axios',
            'keen-ui',
            'vue-content-loader'
         ]);


