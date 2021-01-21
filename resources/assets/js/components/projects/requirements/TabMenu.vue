<template>
    <div class="sales-tab-menu">
    <ui-tabs :fullwidth="false" indicatorColor="primary" class="not-fullwidth background-white">
        <ui-tab
            :key="tab.title"
            :selected="tab.title === 'App Features'"
            :title="tab.title"
            v-for="tab in tabs"
            @select="onTabSelect($event, tab)"
        >
            <div slot="icon">
                <i class="voyager-receipts"></i>
            </div>
            <keep-alive>
                <component v-bind:is="tab.component" :id="id" class="tab"></component>
            </keep-alive>
        </ui-tab>
    </ui-tabs>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        data() {

            let self = this
            return {
                tabs: [
                    {
                        title: 'App Features',
                        icon: 'voyager-receipt',
                        component: () => import(/* webpackChunkName: "js/requirements-bundle" */ './AppFeatures.vue'),
                        click: function () {
                            self.$EventDispatcher.fire('onAppFeaturesTabLoad');
                        }
                    },
                    {
                        title: 'App Design',
                        icon: 'book',
                        component: () => import(/* webpackChunkName: "js/requirements-bundle" */ './AppDesign.vue'),
                        click: function () {
                            self.$EventDispatcher.fire('onAppDesignTabLoad');
                        }
                    }
                ],
            }
        },
        methods: {
            onTabSelect: function(e, tab) {
                tab.click && tab.click()
            }
        }
    }
</script>