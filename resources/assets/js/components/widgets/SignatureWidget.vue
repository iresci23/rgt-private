<template>
    <div class="row mt-2">

        <div class="col-sm-12">
            <h4>Signatures</h4>
            <table class="table table-striped table-bordered theme1" cellpadding="1">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Organization</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <draggable 
                    v-model="items" tag="tbody" 
                    @start="dragging = true"
                    @end="onDragEnd"
                    handle=".handle">
                    <tr v-for="(item, index) in items" :key="index">
                        <td scope="row" class="text-center"><span class="material-icons handle">drag_handle</span></td>
                        <td scope="row">{{ item.name }}</td>
                        <td scope="row">{{ item.organization }}</td>
                        <td scope="row">{{ item.email }}</td>
                        <td scope="row" class="text-center"><i class="voyager-trash" @click="deleteItem(index)"></i></td>
                    </tr>
                </draggable>
                <tr v-if="items.length == 0">
                    <td colspan="5"><div class="text-empty-result">No data</div></td>
                </tr>
            </table>

            <button class="btn btn-default" @click="add"><span class="material-icons">add_box</span> Add Signature</button>

        </div>

        <!-- Add -->
        <modal-form 
            ref="refModalAdd" 
            name="addModal" 
            v-on:save="onSave">
        </modal-form>

        <!-- Delete -->
        <modal-confirm 
            ref="refConfirmDelete" 
            name="deleteModal" 
            v-on:confirm="onConfirmDelete">
        </modal-confirm>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {

    props: {
        keyId: { required: true },
        value: { required: true },
        autoSave: { required: false, default: true }
    },

    data () {
        return {
            items: this.value || [],
            dragging: false
        }
    },    

    mounted() {

        this.debounceFn = _.debounce( () => {

            /** save the table to DB */
            this.$API.Question.update(this.keyId, {
                options: this.items
            })
            .then( (res) => {
                this.$notify.success("Signature saved!")
            })
    
        }, 1000)

    },

    methods: {

        add: function () {
            /**
             * Note: This uses ModalForm.vue, a component accepting dynamic fields
             * @params options for Modal options such as Title
             * @params form for Modal form containing the field info
             */
            this.$refs['refModalAdd'].set({
                title: `Add Signature`,
                html: '',
                confirmButtonText: 'Save'
            }, [
                { field: 'name', layout: 'text-input', label: 'Name', type: 'text', value: '', hidden: false, required: true },
                { field: 'organization', layout: 'text-input', label: 'Organization', type: 'text', value: '', hidden: false, required: true },
                { field: 'email', layout: 'text-input', label: 'Email', type: 'email', value: '', hidden: false, required: true }
            ]).open()
        },

        onSave: function(form) {

            this.items.push(form)

            this.onAutoSave()

            console.log("onSave", form)
        },

        onAutoSave: function() {
            this.$nextTick( () => {
                this.$notify.message("Saving...")
                this.debounceFn()
            })
        },

        deleteItem: function(index) {
            this.$refs['refConfirmDelete'].set({
                title: `Confirm delete`,
                html: 'Are you sure you want to permanently delete this signature?',
                confirmButtonText: 'Delete'
            }, index).open()
        },

        onConfirmDelete: function(index) {

            this.items.splice(index, 1)

            this.onAutoSave()
        },

        onDragEnd: function (e) {

            this.dragging = false

            this.onAutoSave()
        },
    },

    components: {
        'modal-confirm': require('../helpers/ModalConfirm.vue').default,
        'modal-form': require('../helpers/ModalForm.vue').default
    },
    
}
</script>