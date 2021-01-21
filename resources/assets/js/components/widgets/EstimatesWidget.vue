<template>
    <div>
        <ui-alert v-if="showAlert" @dismiss="dismissAlert">
            When you enter numbers here, the project’s total time & cost get automatically updated on Timeline & Costs section. 
            The Estimates section will not be included when you generate the proposal.
        </ui-alert>

        <table class="table table-hover table-bordered no-footer editable-table estimates-table">
            <thead>
                <th width="40%">Component</th>
                <th width="60px" class="text-center">Internal Notes</th>
                <th class="text-center">Scope Status</th>
                <th class="text-center">BA Hours</th>
                <th class="text-center">Dev Hours</th>
                <th class="text-center">QA Hours</th>
                <th class="text-center">PM Hours</th>
                <th class="text-center">Total</th>
            </thead>
            <tbody>
                
                <tr v-if="loading">
                    <td colspan="8"><content-loader></content-loader></td>
                </tr>
                
                <row v-for="(row,idx) in rows" :key="row.id" 
                    :item="row"
                    :index="idx"
                    :projectId="projectId">
                </row>

                <tr class="footer-totals">
                    <td class="dark-bg">Total Hours</td>
                    <td class="dark-bg"></td>
                    <td class="dark-bg"></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalHours.ba_hours || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalHours.dev_hours || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalHours.qa_hours || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalHours.pm_hours || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalHours.grand_total || '-' }}</span></td>
                </tr>
                <tr class="footer-totals">
                    <td class="dark-bg">MVP Total Hours</td>
                    <td class="dark-bg"></td>
                    <td class="dark-bg"></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalMvpHours.ba_hours || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalMvpHours.dev_hours || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalMvpHours.qa_hours || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalMvpHours.pm_hours || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ totalMvpHours.grand_total || '-' }}</span></td>
                </tr>
                <tr class="footer-totals">
                    <td colspan="3">Rate per Hour</td>
                    <td class="text-right">

                        <input v-if="editOnRate == 'ba_rate'"  
                            ref="focusRateInput" type="number" 
                            class="inline-input-editor text-right" 
                            v-model.number="rates.ba_rate" 
                            @input="autoSaveRate" autofocus 
                            min="0" max="1000" /> 

                        <span v-else class="clickable-span number" @click.stop="editOnRate = 'ba_rate'">
                            {{ '$ '+rates.ba_rate || '-' }}
                        </span>
                    </td>
                    <td class="text-right">

                        <input v-if="editOnRate == 'dev_rate'"  
                            ref="focusRateInput" type="number" 
                            class="inline-input-editor text-right" 
                            v-model.number="rates.dev_rate" 
                            @input="autoSaveRate" autofocus 
                            min="0" max="1000" /> 

                        <span v-else class="clickable-span number" @click.stop="editOnRate = 'dev_rate'">
                            {{ '$ '+rates.dev_rate || '-' }}
                        </span>
                    </td>
                    <td class="text-right">

                        <input v-if="editOnRate == 'qa_rate'"  
                            ref="focusRateInput" type="number" 
                            class="inline-input-editor text-right" 
                            v-model.number="rates.qa_rate" 
                            @input="autoSaveRate" autofocus 
                            min="0" max="1000" /> 

                        <span v-else class="clickable-span number" @click.stop="editOnRate = 'qa_rate'">
                            {{ '$ '+rates.qa_rate || '-' }}
                        </span>
                    </td>
                    <td class="text-right">

                        <input v-if="editOnRate == 'pm_rate'"  
                            ref="focusRateInput" type="number" 
                            class="inline-input-editor text-right" 
                            v-model.number="rates.pm_rate" 
                            @input="autoSaveRate" autofocus 
                            min="0" max="1000" /> 

                        <span v-else class="clickable-span number" @click.stop="editOnRate = 'pm_rate'">
                            {{ '$ '+rates.pm_rate || '-' }}
                        </span>
                    </td>
                    <td class="dark-bg"></td>
                </tr>
                <tr class="footer-totals">
                    <td class="dark-bg" colspan="3">Total Amount</td>
                    <td class="dark-bg text-right"><span class="number">${{ totalAmount.ba || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">${{ totalAmount.dev || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">${{ totalAmount.qa || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">${{ totalAmount.pm || '-' }}</span></td>
                    <td class="dark-bg"></td>
                </tr>
                <tr class="footer-totals">
                    <td class="dark-bg" colspan="3">MVP Total Amount</td>
                    <td class="dark-bg text-right"><span class="number">${{ totalMvpAmount.ba || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">${{ totalMvpAmount.dev || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">${{ totalMvpAmount.qa || '-' }}</span></td>
                    <td class="dark-bg text-right"><span class="number">${{ totalMvpAmount.pm || '-' }}</span></td>
                    <td class="dark-bg"></td>
                </tr>
                <tr class="footer-totals">
                    <td colspan="8">
                        &nbsp;
                    </td>
                </tr>
                <tr class="footer-totals">
                    <td class="dark-bg" colspan="3">Project Total Amount</td>
                    <td class="dark-bg" colspan="2"><span class="number"> ${{ totalAmount.grand_total || 0 }} </span></td>
                </tr>
                <tr class="footer-totals">
                    <td class="dark-bg" colspan="3">MVP Project Total Amount</td>
                    <td class="dark-bg" colspan="2"><span class="number"> ${{ totalMvpAmount.grand_total || 0 }} </span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: [ 'projectId' ],
    data () {
        return {
            rows: {},
            rates: {
                ba_rate: 0,
                dev_rate: 0,
                qa_rate: 0,
                pm_rate: 0,
            },
            editOnRate: null,
            loading: false,
            showAlert: false,
        }
    },    

    mounted() {

        this.debounceFn = _.debounce( () => {

            /** save the table to DB */
           this.$API.Project.saveRates(this.projectId, this.rates)
            .then( (res) => {
                this.$notify.success("Rates updated!")
            })
    
        }, 1000)

        this.getComponents()

        /** Listen to event fired from Row.vue */
        this.$EventDispatcher.listen('caclParentRowTotal', (parent) => { 
            this.caclParentRowTotal(parent)
        })

        this.alertNotYetDismissed;
    },

    methods: {
        /** Get the component and usecases from Requirements tab data */
        getComponents: function() {

            this.loading = true
            this.$API.Component.all(this.projectId, 'with_use_cases, with_estimates')
            .then(res => {

                let items = [];

                /** Let's flatten the result so the the Components and the Use Case items are in same array level */
                (res.data.data).forEach(item => {

                    let estimate = item.estimate || {}

                    items.push({
                        id: estimate.id || null,
                        component_id: item.id,
                        use_case_id: null,
                        name: item.name,
                        scope: estimate.scope || 'mvp',   
                        ba_hours: estimate.ba_hours || 0,
                        dev_hours: estimate.dev_hours || 0,
                        qa_hours: estimate.qa_hours || 0,
                        pm_hours: estimate.pm_hours || 0,
                        notes: estimate.notes || "",
                        type: 'component',
                        class: `p${item.id}`,
                        expanded: true,
                        level: 1
                    });

                    if ( item.useCases ) {
                        /** Push the use case items */
                        (item.useCases).forEach(usecase => {

                            estimate = usecase.estimate || {}

                            items.push({
                                id: estimate.id || null,
                                component_id: item.id,
                                use_case_id: usecase.id,
                                name: usecase.name,
                                scope: estimate.scope || 'mvp',   
                                ba_hours: estimate.ba_hours || 0,
                                dev_hours: estimate.dev_hours || 0,
                                qa_hours: estimate.qa_hours || 0,
                                pm_hours: estimate.pm_hours || 0,
                                notes: estimate.notes || "",
                                type: 'use_case',
                                class: `p${item.id}_child child`,
                                expanded: false,
                                level: 2
                            });
                        });
                    }
                });

                this.rows = items

            }).then(() => {

                this.getProjectRate()

                this.loading = false
            })
        },

        getProjectRate: function() {

            this.$API.Project.get(this.projectId)
            .then( (res) => {

                let project = res.data

                if ( project ) {
                    this.rates = {
                        ba_rate: parseFloat(project.ba_rate),
                        dev_rate: parseFloat(project.dev_rate),
                        qa_rate: parseFloat(project.qa_rate),
                        pm_rate: parseFloat(project.pm_rate),
                    }
                }
            });
        },

        autoSaveRate: function ( ){
            this.$notify.message("Saving...")
            this.debounceFn()
        },

        /** Calculate the component row based from use case hours */
        caclParentRowTotal: function(parent) {
            
            var index = _.findIndex(this.rows, {
                'component_id': parent.component_id,
                'use_case_id': null
            });

            if (this.rows[index]) {
                /** set the new values */
                Vue.set(this.rows[index], 'ba_hours', parent.ba_hours);
                Vue.set(this.rows[index], 'dev_hours', parent.dev_hours);
                Vue.set(this.rows[index], 'qa_hours', parent.qa_hours);
                Vue.set(this.rows[index], 'pm_hours', parent.pm_hours);
            }
        },

        dismissAlert: function() {
            this.showAlert = false
            // rmeove the cookie
            document.cookie = `project${this.projectId}_estimate=closed;`;  
        },
    },

    computed: {
        totalHours: function() {
            // return usecases only
            let filteredRows = _.filter(this.rows, function(r) { return r.use_case_id; }),
                ba_hours = _.sumBy(filteredRows, function(o) { return parseFloat(o.ba_hours); }),
                dev_hours = _.sumBy(filteredRows, function(o) { return parseFloat(o.dev_hours); }),
                qa_hours = _.sumBy(filteredRows, function(o) { return parseFloat(o.qa_hours); }),
                pm_hours = _.sumBy(filteredRows, function(o) { return parseFloat(o.pm_hours); })

            return {
                ba_hours: ba_hours,
                dev_hours: dev_hours,
                qa_hours: qa_hours,
                pm_hours: pm_hours,
                grand_total: ba_hours + dev_hours + qa_hours + pm_hours
            }
        },

        totalMvpHours: function() {
            // return usecases with MVP scope only 
            let filteredRows = _.filter(this.rows, function(r) { return r.use_case_id && r.scope == 'mvp'; }),
                ba_hours = _.sumBy(filteredRows, function(o) { return parseFloat(o.ba_hours); }),
                dev_hours = _.sumBy(filteredRows, function(o) { return parseFloat(o.dev_hours); }),
                qa_hours = _.sumBy(filteredRows, function(o) { return parseFloat(o.qa_hours); }),
                pm_hours = _.sumBy(filteredRows, function(o) { return parseFloat(o.pm_hours); })

            return {
                ba_hours: ba_hours,
                dev_hours: dev_hours,
                qa_hours: qa_hours,
                pm_hours: pm_hours,
                grand_total: ba_hours + dev_hours + qa_hours + pm_hours
            }
        },

        totalAmount: function() {
            let totalHours = this.totalHours,
                rates = this.rates,
                ba = parseFloat(totalHours.ba_hours * rates.ba_rate),
                dev = parseFloat(totalHours.dev_hours * rates.dev_rate),
                qa = parseFloat(totalHours.qa_hours * rates.qa_rate),
                pm = parseFloat(totalHours.pm_hours * rates.pm_rate)

            return {
                ba: ba.toLocaleString(),
                dev: dev.toLocaleString(),
                qa: qa.toLocaleString(),
                pm: pm.toLocaleString(),
                grand_total: (ba + dev + qa + pm).toLocaleString()
            }
        },

        totalMvpAmount: function() {
            let totalMvpHours = this.totalMvpHours,
                rates = this.rates,
                ba = parseFloat(totalMvpHours.ba_hours * rates.ba_rate),
                dev = parseFloat(totalMvpHours.dev_hours * rates.dev_rate),
                qa = parseFloat(totalMvpHours.qa_hours * rates.qa_rate),
                pm = parseFloat(totalMvpHours.pm_hours * rates.pm_rate)

            return {
                ba: ba.toLocaleString(),
                dev: dev.toLocaleString(),
                qa: qa.toLocaleString(),
                pm: pm.toLocaleString(),
                grand_total: (ba + dev + qa + pm).toLocaleString()
            }
        },

        alertNotYetDismissed: function() {
            
            let self = this
            let key = `project${this.projectId}_estimate=open`
            let key_closed = `project${this.projectId}_estimate=closed`

            if (document.cookie.split(';').some(function(item) {
                return item.indexOf(key) >= 0
            })) {
                // if exists, return true
                self.showAlert = true
            } else {

                if (document.cookie.split(';').some(function(item) {
                    return item.indexOf(key_closed) >= 0
                })) {
                    // if exists, return true
                    self.showAlert = false
                } else {
                    document.cookie = key;
                    self.showAlert = true
                }
            }

            return self.showAlert;
        }
    },  

    components: {
        'row': require('./TableParts/EstimateRow.vue').default,
    }
}
</script>