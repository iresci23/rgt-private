<template>
    <div class="timeline-cost-section mt-2">

        <div class="flex flex-end">

            <a href="javascript:;" @click.stop="deleteTable" class="btn btn-danger-outlined pull-right">
                <span class="material-icons">cancel</span> Delete this table
            </a> &nbsp;&nbsp;

            <button class="btn btn-primary" @click.stop="resetTable" ><span class="material-icons">settings_backup_restore</span> Reset all to default values</button>

        </div>

        <table class="table table-hover table-bordered no-footer padded-table editable-table estimates-table">
            <thead>
                <th width="60%" class="text-center">Component</th>
                <th width="10%"  class="text-center">Estimated Hours</th>
                <th width="10%" class="text-center">Timeline (Days)</th>
                <th width="20%" class="text-center">Costs</th>
            </thead>
            <tbody>

                <!-- Loop per group -->
                <template v-for="(group, key) in rows">
                    
                    <!-- Header row -->
                    <tr :key="'g'+key">
                        <td class="dark-bg text-dark">{{ headerLabels[key] }}</td>
                        <td class="dark-bg"></td>
                        <td class="dark-bg"></td>
                        <td class="dark-bg"></td>
                    </tr>

                    <!-- Details -->

                    <tr v-if="loading" :key="'g'+key">
                        <td colspan="4"><content-loader></content-loader></td>
                    </tr>

                    <row v-for="(item,idx) in group" :key="key+idx" 
                        :item="item"
                        :index="key+idx"
                        :project-id="projectId">
                    </row>

                    <!-- Sub total -->
                    <tr class="sub-totals" :key="key">
                        <td>Sub Total</td>
                        <td class="text-right"><span class="number">{{ getSubTotal(key).hours }}</span></td>
                        <td class="text-right"><span class="number">{{ getSubTotal(key).days }}</span></td>
                        <td class="text-right"><span class="number">$ {{ getSubTotal(key).cost }}</span></td>
                    </tr>

                </template>

            </tbody>
            <tfoot>
                <!-- Grant Total -->
                <tr class="footer-totals">
                    <td class="dark-bg">Grand Total</td>
                    <td class="dark-bg text-right"><span class="number">{{ grandTotalHours.hours }}</span></td>
                    <td class="dark-bg text-right"><span class="number">{{ grandTotalHours.days }}</span></td>
                    <td class="dark-bg text-right"><span class="number">$ {{ grandTotalHours.cost }}</span></td>
                </tr>
            </tfoot>
        </table>

        <!-- Delete -->
        <modal-confirm 
            ref="refConfirmAction" 
            name="actionModal" 
            v-on:confirm="onConfirmAction">
        </modal-confirm>

    </div>    
</template>

<script>
export default {
    props: {
        keyId: { required: true },
        autoSave: { required: false, default: true },
        projectId: { required: true }
    },

    data () {
        return {
            rows: {},
            headerLabels: {
                mvp: 'MVP Features',
                optional: 'Optional / Post-MVP Features',
                out_of_scope: 'Out of Scope'
            },
            loading: false,
            buttonAction: null
        }
    },    

    mounted() {

        let self = this

        this.getTimeAndCost( () => {
            self.loading = false
        })

        // this.$EventDispatcher.listen('onTimeCostTableUpdate', () => { this.saveUpdate() });

    },

    methods: {

        getTimeAndCost: function (callback) {
            
            this.loading = true
            
            this.$API.Estimate.getTimeAndCost(this.projectId)
            .then( (res) => {
                this.rows = res.data

                callback && callback()
                
            })
        },

        getSubTotal (group) {

            let total = {};
            total.hours = 0;
            total.days = 0;
            total.cost = 0;

            let groupedRows = this.rows[group];

            Array.from(groupedRows).forEach(function(row) {
                total.hours += parseFloat(row.total_hours)
                total.days += parseFloat(row.total_days)
                total.cost += parseFloat(row.total_cost)
            });

            total.days = (total.days).toFixed(1)
            total.cost = (total.cost).toLocaleString()

            return total;
        },

        resetTable: function () {
            
            this.buttonAction = 'reset'

            this.$refs['refConfirmAction'].set({
                title: `Confirm reset`,
                html: `Are you sure you want to discard all changes and reset all to the default values?`,
                confirmButtonText: 'Yes',
                denyButtonText: 'No'
            }, {}).open()

        },

        deleteTable: function() {

            this.buttonAction = 'delete'

            this.$refs['refConfirmAction'].set({
                title: `Confirm delete`,
                html: `Are you sure you want to delete this table? This action cannot be undone`,
                confirmButtonText: 'Yes',
                denyButtonText: 'No'
            }, {}).open()
        },

        onConfirmAction: function() {

            let self = this

            if ( this.buttonAction == 'reset' ) {

                this.$API.Estimate.resetTimeAndCost(
                    this.projectId
                )
                .then( (res) => {
                    
                    self.rows = []
                    self.$notify.success("Table reset!")

                    self.getTimeAndCost( () => {
                        self.loading = false
                    })
                })

            } else {
               
                this.$nextTick( () => {
                    this.$EventDispatcher.fire('onTimeCostTableDelete', this.keyId);
                })
                
            }
            
            this.buttonAction = null
        },

    },

    computed: {
        grandTotalHours: function () {

            let groups = Object.keys(this.rows),
                total = {
                    hours: 0,
                    days: 0,
                    cost: 0
                },
                self = this;

            _.forEach(groups, function(group) {

                total.hours += _.sumBy(self.rows[group], function(g) { 
                    return parseFloat(g.total_hours)
                });

                total.days += _.sumBy(self.rows[group], function(g) { 
                    return parseFloat(g.total_days)
                });

                total.cost += _.sumBy(self.rows[group], function(g) { 
                    return parseFloat(g.total_cost)
                });

            });
            
            total.days = (total.days).toFixed(1)
            total.cost = total.cost.toLocaleString()

            return total;
      
      }
    },

    components: {
        'modal-confirm': require('../helpers/ModalConfirm.vue').default,
        'row': require('./TableParts/TimeCostRow.vue').default,
    },
}
</script>