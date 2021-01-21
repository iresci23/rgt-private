<template>
    <div>
    <ui-tabs fullwidth raised 
        type="icon-and-text" 
        indicatorColor="white">
        <ui-tab
            :id="tab.title"
            :selected="tab.title == active"
            :key="tab.title"
            :title="tab.title"
            v-for="tab in tabs"
            @select="onTabSelect($event, tab)"
        >
            <ui-icon slot="icon" :icon="tab.icon"></ui-icon>
            <keep-alive>
                <component v-bind:is="tab.component" :id="id" :name="name" class="tab" v-if="tab.component"></component>
            </keep-alive>
        </ui-tab>
    </ui-tabs>
    </div>
</template>

<script>
    export default {
        props: ['id', 'active', 'name'],
        data() {
            let self = this
            return {
                tabs: [
                    {
                        title: 'Sales',
                        icon: 'multiline_chart',
                        component: require('./sales/TabMenu.vue').default,
                        click: function () {
                            self.$EventDispatcher.fire('onSalesTabLoad');
                        }

                    },
                    {
                        title: 'Requirements',
                        icon: 'fact_check',
                        component: require('./requirements/TabMenu.vue').default,
                        click: function () {
                            self.$EventDispatcher.fire('onAppFeaturesTabLoad');
                        }
                    },
                    {
                        title: 'Proposal',
                        icon: 'description',
                        // component: require('./proposal/Page.vue').default,
                        component: () => import(/* webpackChunkName: "js/proposal-bundle" */ './proposal/Page.vue'),
                        click: function () {
                            self.$EventDispatcher.fire('onProposalTabLoad');
                        }
                    },
                    {
                        title: 'Use Cases',
                        icon: 'tune',
                        component: null
                    },
                    {
                        title: 'Reports',
                        icon: 'date_range',
                        component: null
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