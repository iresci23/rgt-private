<template>
    <tr :class="item.class" :id="rowId" :parent-id="item.component_id" @mouseleave="editOnIndex = null">
        <td class="title">
            <div>
                <span class="material-icons icon-expanded" v-if="isComponent && item.expanded" @click="expandRow(false)">remove</span>
                <span class="material-icons icon-collapsed" v-if="isComponent && !item.expanded" @click="expandRow(true)">add</span>
                <span class="icon-child-link" v-if="!isComponent"><hr></span>
                <span>{{ item.name }}</span>
            </div>
        </td>
        <td class="text-center">
            <div class="note-icon" :class="{ 'with-red-dot' : item.notes }">
                <span class="material-icons" @click="addNote()">chat</span>
                <span class="note-red-dot"></span>
            </div>
            <div class="context-menu-wrapper" v-if="addNoteOnIndex == index">
                <div class="context-menu">
                    <div class="flex column">
                        <ui-textbox ref="focusInput2"  :multi-line="true" v-model="item.notes" placeholder="Write something..." @input="autoSaveInput"></ui-textbox>
                        <button class="btn btn-xs btn-default pull-right" @click="addNoteOnIndex = null">Close</button>
                    </div>
                </div>
            </div>
        </td>
        <td class="text-center">
            <select name="estimate-scope" v-model="item.scope" @change="autoSaveInput" >
                <option value="mvp">MVP</option>
                <option value="optional">Optional</option>
                <option value="out_of_scope">Out of Scope</option>
            </select>
        </td>
        <td class="text-right">
            <template v-if="!isComponent">

                <input v-if="editOnIndex == index"  
                    ref="focusInput" type="number" 
                    class="inline-input-editor text-right" 
                    v-model.number="item.ba_hours" 
                    @input="autoSaveInput" autofocus 
                    min="0" max="1000" /> 

                <span v-else class="clickable-span number" @click.stop="editItem()">
                    {{ parseFloat(item.ba_hours) || '&nbsp;' }}
                </span>

            </template>
            <template v-else-if="isComponentCollapsed">
                <span class="number">{{ parseFloat(item.ba_hours) || '&nbsp;' }}</span>
            </template>
        </td>
        <td class="text-right">
            <template v-if="!isComponent">

                <input v-if="editOnIndex == index"  
                    ref="focusInput" type="number" 
                    class="inline-input-editor text-right" 
                    v-model.number="item.dev_hours" 
                    @input="autoSaveInput" autofocus 
                    min="0" max="1000" /> 

                <span v-else class="clickable-span number" @click.stop="editItem()">
                    {{ parseFloat(item.dev_hours) || '&nbsp;' }}
                </span>

            </template>
            <template v-else-if="isComponentCollapsed">
                <span class="number">{{ parseFloat(item.dev_hours) || '&nbsp;' }}</span>
            </template>
        </td>
        <td class="text-right">
            <template v-if="!isComponent">

                <input v-if="editOnIndex == index"  
                    ref="focusInput" type="number" 
                    class="inline-input-editor text-right" 
                    v-model.number="item.qa_hours" 
                    @input="autoSaveInput" autofocus 
                    min="0" max="1000" /> 

                <span v-else class="clickable-span number" @click.stop="editItem()">
                    {{ parseFloat(item.qa_hours) || '&nbsp;' }}
                </span>

            </template>
            <template v-else-if="isComponentCollapsed">
                <span class="number">{{ parseFloat(item.qa_hours) || '&nbsp;' }}</span>
            </template>
        </td>
        <td class="text-right">
            <template v-if="!isComponent">

                <input v-if="editOnIndex == index"  
                    ref="focusInput" type="number" 
                    class="inline-input-editor text-right" 
                    v-model.number="item.pm_hours" 
                    @input="autoSaveInput" autofocus 
                    min="0" max="1000" /> 

                <span v-else class="clickable-span number" @click.stop="editItem()">
                    {{ parseFloat(item.pm_hours) || '&nbsp;' }}
                </span>

            </template>
            <template v-else-if="isComponentCollapsed">
                <span class="number">{{ parseFloat(item.pm_hours) || '&nbsp;' }}</span>
            </template>
        </td>
        <td class="text-right dark-bg"> 
            <template v-if="!isComponent || isComponentCollapsed">
                <span class="number">{{ parseFloat(colTotal) || '&nbsp;' }}</span>
            </template>
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
            type: Number
        },  
        projectId: {
            required: true
        }
    },

    data() {
        return {
            editOnIndex: null,
            addNoteOnIndex: null
        }
    },

    mounted() {

        this.debounceFn = _.debounce( () => {

            /** save the table to DB */
            this.item.project_id = this.projectId 

            this.$API.Estimate.save(this.item)
            .then( (res) => {
                this.$EventDispatcher.fire('caclParentRowTotal', res.data.parent )
                this.$notify.success("Table updated!")
            })
    
        }, 1000)

    },

    methods: {
        expandRow: function(method) {

            if ( !method ) {
                $(`tr.${this.item.class}_child`).hide();
            } else {
                $(`tr.${this.item.class}_child`).show();
            }
            
            this.item.expanded = method;

        },

        editItem: function() {
            this.editOnIndex = this.index
            this.$nextTick( () => {
                if ( this.$refs.focusInput[0] ) {
                    this.$refs.focusInput[0].focus()
                }
            })
        },

        addNote: function() {
            this.addNoteOnIndex = this.index
            this.$nextTick( () => {
                if ( this.$refs.focusInput2[0] ) {
                    this.$refs.focusInput2[0].focus()
                }
            })
        },

        autoSaveInput () {
            this.$notify.message("Saving...")
            this.debounceFn()
        },
    },

    computed: {

        isComponent: function() {
            return this.item.type == 'component'
        },

        rowId: function() {
            let id = this.item.id
            return this.item.type == 'component' ? 'p' + id : 'u' + id
        },

        colTotal: function() {
            let item = this.item
            let total = parseFloat(item.ba_hours) + parseFloat(item.dev_hours) + parseFloat(item.qa_hours) + parseFloat(item.pm_hours)
            return total
        },

        isComponentCollapsed: function() {
            return this.item.type == 'component' && !this.item.expanded
        }
    }
}
</script>