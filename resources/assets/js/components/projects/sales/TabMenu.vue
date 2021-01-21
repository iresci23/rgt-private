<template>
    <div class="sales-tab-menu">
    <ui-tabs :fullwidth="false" indicatorColor="primary" class="not-fullwidth background-white">
        <ui-tab
            :key="tab.title"
            :selected="tab.title === 'Sales Call'"
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
                        title: 'Sales Call',
                        icon: 'voyager-receipt',
                        component: () => import(/* webpackChunkName: "js/sales-bundle" */ './SalesCallTab.vue'),
                        click: function () {
                            self.$EventDispatcher.fire('onSalesTabLoad');
                        }
                    },
                    {
                        title: 'BA Call',
                        icon: 'book',
                        component: () => import(/* webpackChunkName: "js/sales-bundle" */ './BACallTab.vue'),
                        click: function () {
                            self.$EventDispatcher.fire('onBACallTabLoad');
                        }
                    },
                    {
                        title: 'Clients Documents',
                        icon: 'collections_bookmark',
                        component: () => import(/* webpackChunkName: "js/sales-bundle" */ './ProjectMediaTab.vue'),
                        click: function () {
                            self.$EventDispatcher.fire('onDocTabLoad');
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