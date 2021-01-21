<template>
    <tr  @mouseleave="editOnIndex = null">

        <td>{{ item.name }}</td>

        <td class="text-right">

            <input v-if="editOnIndex == index"  
                ref="focusInput" type="number" 
                class="inline-input-editor text-right" 
                v-model.number="item.total_hours" 
                @input="autoSaveInput" autofocus 
                min="0" max="100000" /> 

            <span v-else class="clickable-span number" @click.stop="editItem()">
                {{ parseFloat(item.total_hours) || '&nbsp;' }}
            </span>
            
        </td>

        <td class="text-right">

            <input v-if="editOnIndex == index"  
                ref="focusInput" type="number" 
                class="inline-input-editor text-right" 
                v-model.number="item.total_days" 
                @input="autoSaveInput" autofocus 
                min="0" max="100000" /> 

            <span v-else class="clickable-span number" @click.stop="editItem()">
                {{ dayCount || '&nbsp;' }}
            </span>

        </td>

        <td class="text-right">

            <input v-if="editOnIndex == index"  
                ref="focusInput" type="number" 
                class="inline-input-editor text-right" 
                v-model.number="item.total_cost" 
                @input="autoSaveInput" autofocus 
                min="0" max="100000" /> 

            <span v-else class="clickable-span number" @click.stop="editItem()">
               $ {{ (parseFloat(item.total_cost)).toLocaleString() }}
            </span>

        </td>
    </tr>
</template>
<script>
export default {
    props: {
        item: {
            required: true,
            type: Object
        },  
        index: {
            required: true,
            type: String
        },  
        projectId: {
            required: true
        }
    },

    data() {
        return {
            editOnIndex: null,
        }
    },

    mounted() {


        this.debounceFn = _.debounce( () => {

            this.$API.Estimate.saveTimeAndCost(
                this.projectId, 
                this.item
            )
            .then( (res) => {
                this.$notify.success("Table updated!")
            })
    
        }, 1000)
    },

    computed: {
        dayCount: function() {
            let days = parseFloat(this.item.total_days)
            return Number.isInteger(days) ? days : days.toFixed(1)
        }
    },

    methods: {

        autoSaveInput () {
            this.$notify.message("Saving...")
            this.debounceFn()
        },

        editItem: function() {
            this.editOnIndex = this.index
            this.$nextTick( () => {
                if ( this.$refs.focusInput[0] ) {
                    this.$refs.focusInput[0].focus()
                }
            })
        },
    }
}
</script>