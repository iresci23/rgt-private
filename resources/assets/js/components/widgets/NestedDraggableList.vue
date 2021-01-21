<template>
    <div class="nested-draggable">

        <draggable 
          class="list-group dragArea" 
          tag="ul" 
          handle=".handle"
          ghost-class="ghost"
          group="ucnested"
          :list="options" 
          :data-level="level"
          @start="onDragStart"
          @end="onDragEnd"
          :move="onDragMove">

            <li v-for="(item, index) in options"
              :key="'uc'+item.id"
              :id="'uc'+item.id"
              :data-id="item.id"
              @mouseover="hoveredIndex = index"
              @mouseleave="hoveredIndex = null; actionMenuIndex = null"
              class="list-group-item cursor-pointer not-flex p0"
              :class="{ 'has-children' : item.children_recursive.length }"
            >
              <div class="flex">

                <span class="material-icons handle">drag_handle</span> 

                <input ref="focusNestedInput" type="text" 
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

              </div>

              <nested-draggable-list 
                v-if="level < maxLevel"
                :options="item.children_recursive" 
                :class="{'sublevel': item.children_recursive.length}"
                :level="level + 1"
                :data-parent="item.id"
                :data-index="index"
              />

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
      type: Array
    },
    level: {
      required: false,
      default: 1
    },
    deleteMessage: {
        required: false,
        type: String,
        default: 'Are you sure you want to permanently delete this use case?'
    }
  },

  data() {
      let self = this
      return {
          dragging: false,
          hoveredIndex: null,
          actionMenuIndex: null,
          editOnIndex: null,
          selected: {},
          maxLevel: 2
      }
  },

  mounted() {

      this.debounceFn = _.debounce( (item) => {

          // emit the onNestedEditedItem event via EventDispatcher
          this.$EventDispatcher.fire('onNestedEditedItem', item)
  
      }, 900)

  },

  methods: {

    /**
     * Enable the inline edit when item is clicked
     */
    editItem (item, index) {

        this.editOnIndex = index

        this.$nextTick( () => {
            this.selected.old_name = item.name;
            if ( this.$refs.focusNestedInput[0] ) {
                this.$refs.focusNestedInput[0].focus()
            }
        })
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

    duplicateItem (item, index) {

      this.actionMenuIndex = null

      this.$nextTick( () => {
        this.$EventDispatcher.fire('onNestedDuplicateItem', item);
      })
  
    },

    deleteItem (item, index) {
        this.actionMenuIndex = null
        this.$refs['refConfirmDelete'].set({
            title: `Delete ${ item.name }?`,
            html: this.deleteMessage,
            confirmButtonText: 'Delete'
        }, item).open()
    },

    onDragStart: function (e) {
        this.dragging = true
    },

    onDragEnd: function (e) {

        this.dragging = false

        let new_parent_id = null,
            item_id = $(e.item).data('id'),
            parent_index = e.newIndex //default index when new_parent_id = null

        if ( $(e.to.parentElement).data('parent') ) {
          new_parent_id = $(e.to.parentElement).data('parent')
          parent_index = $(e.to.parentElement).data('index')
        }

        this.$nextTick( () => {

          this.$EventDispatcher.fire('onNestedDragEnd', {
            item_id: item_id,
            new_parent_id: new_parent_id,
            parent_index: parent_index,
            item_index: e.newIndex
          })

        })
    },

    /**
     * Do not drop elements with children to level 2
     */
    onDragMove: function(e) {
      let draggedEl = e.draggedContext.element
      if ( 
          draggedEl.children_recursive.length > 0 && 
          e.relatedContext.component.$attrs['data-level'] == 2
        ) {
          // console.debug(draggedEl.children_recursive.length,  e.relatedContext.component.$attrs['data-level'])
        // it has children, so do not drop to level 2
        return false;
      } else if ( e.relatedContext.component.$attrs['data-level'] == 3) {
        return false;
      }
      return true;
    },

    onConfirmDelete: function(item) {
        this.$nextTick( () => {
          this.$EventDispatcher.fire('onNestedConfirmDelete', item);
        })
    },

  },
  
  components: {
    'modal-confirm': require('../helpers/ModalConfirm.vue').default,
  },

  name: "nested-draggable-list"
};
</script>
<style scoped>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>