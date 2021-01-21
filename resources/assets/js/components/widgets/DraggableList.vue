<template>
    <div class="widget">
        <draggable
            :id="name"
            :list="options"
            class="list-group"
            ghost-class="ghost"
            @start="dragging = true"
            @end="onDragEnd"
            handle=".handle"
        >
            <li v-for="(item, index) in options" :class="{ 'active' : item.id == selected.id }"
                :data-id="item.id"
                class="list-group-item cursor-pointer flex" 
                @click="selectItem(item)" :key="item.id"
                @mouseover="hoveredIndex = index"
                @mouseleave="hoveredIndex = null; actionMenuIndex = null">

                <span class="material-icons handle">drag_handle</span>

                <input ref="focusInput" type="text" 
                    class="inline-input-editor" 
                    v-if="editOnIndex == index" 
                    v-model="item.name" 
                    @input="autoSaveInput($event, item)" autofocus /> 

                <span v-else class="item-title flex-grow-1" @click.stop="editItem(item, index)">
                    {{ item.name }}
                </span>

                <div class="context-menu-wrapper" v-if="hoveredIndex == index">
                    <span class="material-icons icon-more-vertical" v-on:click.stop="openActionMenu(item, index)">more_vert</span>
                    <div class="context-menu" v-if="actionMenuIndex == index">
                        <ul>
                            <li v-on:click.stop="duplicateItem(item, index)">Duplicate</li>
                            <li v-on:click.stop="deleteItem(item, index)">Delete</li>
                        </ul>
                    </div>
                </div>
            </li>
        </draggable>

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
        options: {
            required: true,
            default: Object
        },
        selectedItem: {
            required: false,
            default: Object
        },
        deleteMessage: {
            required: false,
            type: String,
            default: 'Are you sure you want to permanently delete this component and all related use cases?'
        },
        name: {
            required: false,
            default: 'draggableWigdet'
        }
    },
    
    data() {
        return {
            selected: this.selectedItem || {},
            dragging: false,
            hoveredIndex: null,
            actionMenuIndex: null,
            editOnIndex: null
        }
    },

    mounted() {

        this.debounceFn = _.debounce( (item) => {

            // emit the editedItem event
            this.$emit('editedItem', item)
    
        }, 900)

    },

    methods: {

        selectItem (item) {
            this.selected = item
            // get the use cases for this component
            this.$emit('selectItem', item);
        },

        editItem (item, index) {

            if ( this.selected.id == item.id ) {
                this.editOnIndex = index
                this.selected.old_name = item.name
                this.$nextTick( () => {
                    if ( this.$refs.focusInput[0] ) {
                        this.$refs.focusInput[0].focus()
                    }
                })

            } else {
                this.selectItem(item)
            }
        },

        /**
         * Handle the editing of the item's name
         * debounceFn delays the input change
         */
        autoSaveInput (e, item) {

            item.old_name = this.selected.old_name

            this.debounceFn(item)

        },

        openActionMenu(item, index) {
            this.actionMenuIndex = index
        },

        deleteItem (item, index) {
            this.actionMenuIndex = null
            this.$refs['refConfirmDelete'].set({
                title: `Delete ${ item.name }?`,
                html: this.deleteMessage,
                confirmButtonText: 'Delete'
            }, item).open()
        },

        duplicateItem (item, index) {
            this.$emit('duplicateItem', item)
        },

        onDragEnd: function (e) {

            this.dragging = false

            let item_id = $(e.item).data('id'),
                item_index = e.newIndex
            
            this.$emit('dragListEnd', {
                item_id: item_id,
                item_index: item_index
            });
        },

        onConfirmDelete: function(item) {
            this.$emit('confirmDelete', item)
        },


    },

    watch: {

    },

    components: {
        'modal-confirm': require('../helpers/ModalConfirm.vue').default,
    }
}
</script>