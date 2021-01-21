<template>
    <div class="col-sm-12 col-md-8 col-md-offset-2">
        <a href="javascript:;" @click.stop="deleteTable" class="btn btn-danger-outlined pull-right"><span class="material-icons">cancel</span> Delete this table</a>
        <table class="table table-hover table-bordered no-footer editable-table">
            <thead>
                <th></th>
                <th width="100px" class="text-center">Score</th>
                <th width="60px"  class="text-center">Notes</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td><span>{{ item.name }}</span></td>
                    <td class="text-center">

                        <input ref="focusInput" type="number" 
                            class="inline-input-editor text-center" 
                            v-if="editOnIndex == index" 
                            v-model.number="item.score" 
                            @input="validateScore(item, index)" autofocus 
                            min="0" max="10" /> 

                        <span v-else class="clickable-span" @click.stop="editItem(item, index)">
                            {{ item.score > 0 ? item.score : '&nbsp' }}
                        </span>

                    </td>
                    <td class="text-center">
                        <div class="note-icon" :class="{ 'with-red-dot' : item.notes }">
                            <span class="material-icons" @click="addNote(item, index)">chat</span>
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
                </tr>
            </tbody>
        </table>

        <!-- Delete -->
        <modal-confirm 
            ref="refConfirmDelete" 
            name="deleteModal" 
            v-on:confirm="onConfirmDelete">
        </modal-confirm>

    </div>    
</template>

<script>
export default {
    props: {
        keyId: { required: true },
        value: { required: true },
        autoSave: { required: false, default: true }
    },

    data () {
        return {
            items: this.value || '',
            editOnIndex: null,
            addNoteOnIndex: null
        }
    },    

    mounted() {

        this.debounceFn = _.debounce( () => {

            /** save the table to DB */
            this.$API.Question.update(this.keyId, {
                options: this.items
            })
            .then( (res) => {
                this.$notify.success("Table updated!")
            })
    
        }, 1000)

    },

    methods: {

        validateScore(item, index) {
            if ( item.score > 10) {
                this.$notify.error("Please rate on a scale of 1-10")
                this.items[index].score = 0
                return false;
            } else {
                this.autoSaveInput()
            }
        },

        autoSaveInput () {
            this.$notify.message("Saving...")
            this.debounceFn()
        },

        editItem: function(item, index) {
            this.editOnIndex = index
            this.$nextTick( () => {
                if ( this.$refs.focusInput[0] ) {
                    this.$refs.focusInput[0].focus()
                }
            })
        },

        addNote: function(item, index) {
            this.addNoteOnIndex = index
            this.$nextTick( () => {
                if ( this.$refs.focusInput2[0] ) {
                    this.$refs.focusInput2[0].focus()
                }
            })
        },

        deleteTable: function() {
            this.$refs['refConfirmDelete'].set({
                title: `Confirm delete`,
                html: `Are you sure you want to delete this table? This action cannot be undone`,
                confirmButtonText: 'Yes',
                denyButtonText: 'No'
            }, {}).open()
        },

        onConfirmDelete: function() {

            this.$nextTick( () => {
                this.$EventDispatcher.fire('onPersonalityTableDelete', this.keyId);
            })
        }
    },

    components: {
        'modal-confirm': require('../helpers/ModalConfirm.vue').default,
    },
}
</script>