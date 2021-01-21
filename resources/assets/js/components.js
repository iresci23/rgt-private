
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import KeenUI from 'keen-ui';

import DynamicForm from './dynamic_forms.js'

import Api from './api/index'
import EventDispatcher from './services/EventDispatcher'
import Notify from './services/Notify';

import {
    ContentLoader,
    BulletListLoader,
    ListLoader
} from 'vue-content-loader'

import './directives'

Vue.prototype.$API = Api;
Vue.prototype.$EventDispatcher = new EventDispatcher();
Vue.prototype.$DynamicForm = DynamicForm;
Vue.prototype.$notify = new Notify();

/**
 * Reusable components
 */
Vue.component('content-loader', ContentLoader);
Vue.component('bullet-list-loader', BulletListLoader);
Vue.component('list-loader', ListLoader);
Vue.component('bulk-delete', require('./components/helpers/BulkDelete.vue').default);
Vue.component('bulk-archive', require('./components/helpers/BulkArchive.vue').default);
Vue.component('button-restore', require('./components/helpers/ButtonRestore.vue').default);
Vue.component('draggable-list', require('./components/widgets/DraggableList.vue').default);
Vue.component('nested-draggable-list', require('./components/widgets/NestedDraggableList.vue').default);
Vue.component('text-area', Vue.prototype.$DynamicForm.textArea);
Vue.component('text-input', Vue.prototype.$DynamicForm.textInput);
Vue.component('selection', Vue.prototype.$DynamicForm.selection);
Vue.component('radio-group', Vue.prototype.$DynamicForm.radioGroup);
Vue.component('check-group', Vue.prototype.$DynamicForm.checkGroup);
Vue.component('text-editor', require('./components/widgets/TextEditor.vue').default);
Vue.component('button-to-input', require('./components/helpers/ButtonToInput.vue').default);
Vue.component('personality-table-widget', require('./components/widgets/PersonalityTableWidget.vue').default);
Vue.component('signature-widget', require('./components/widgets/SignatureWidget.vue').default);
Vue.component('estimates-widget', require('./components/widgets/EstimatesWidget.vue').default);
Vue.component('time-cost-widget', require('./components/widgets/TimeCostWidget.vue').default);

Vue.component('project-form', require('./components/projects/Form.vue').default);
Vue.component('project-page', require('./components/projects/TabMenu.vue').default);

/** Heavy component will be compiled to another bundle */
Vue.component('project-list', () => import(/* webpackChunkName: "js/project-list" */ './components/projects/List.vue'));

Vue.use(KeenUI,{
    UiButton: {
        disableRipple: true
    },
    UiTooltip: {
        position: 'top'
    },
    UiSelect: {
        keys: () => ({
            value: 'id',
            label: 'name',
        }),
    },
    UiTabs: {
        disableRipple: true
    },
    UiTab: {
        disableRipple: true
    }
});

const app = new Vue({
    el: '#vue-app'
});
