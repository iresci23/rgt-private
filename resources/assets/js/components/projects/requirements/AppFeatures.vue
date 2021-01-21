<template>
    <div class="row">

        <ui-alert v-if="showAlert || alertNotYetDismissed" @dismiss="dismissAlert">
            Your project’s proposal and use cases will automatically be generated based on the requirements you enter here.
        </ui-alert>

        <div class="left-panel col-sm-12 col-md-4">
            <list-loader v-if="loadingLeft"></list-loader>

            <draggable-list 
                ref="appFeaturesList"
                name="app-features"
                :options="options" 
                :selected-item="selected" 
                v-on:selectItem="onSelectItem" 
                v-on:dragListEnd="onDragListEnd"
                v-on:confirmDelete="onConfirmDelete"
                v-on:duplicateItem="onDuplicateItem"
                v-on:editedItem="onEditedItem">
            </draggable-list>

            <button-to-input 
                value=""
                label="Add New Module"
                v-on:newinput="onNewInput"
            ></button-to-input>

        </div>
        <div class="right-panel col-sm-12 col-md-8">

            <div class="row">
                <div class="col-sm-12">
                    <bullet-list-loader v-if="loadingRight"></bullet-list-loader>
                    <nested-draggable-list 
                        :options="useCases" v-if="!loadingRight"
                    ></nested-draggable-list>
                </div>
                <div class="col-sm-12">
                    <button-to-input 
                        value=""
                        label="Add Feature"
                        v-on:newinput="onNewFeatureInput"
                        class="p0"
                    ></button-to-input>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {

        props: {
            id: { //the project id
                required: true
            }
        },

        data() {
            let self = this
            return {
                options: [],
                selected: {},
                useCases: [],
                loadingLeft: true,
                loadingRight: false,
                showAlert: false,
            }
        },

        mounted () {
            
            if ( route().current('Project.requirements') ) {  this.getComponents()  }

            this.$EventDispatcher.listen('onAppFeaturesTabLoad', () => { 
                if ( route().current('Project.requirements') ) {  
                    this.getComponents()  
                } else {
                    location.href = route('Project.requirements', this.id)
                }
            })

            this.$EventDispatcher.listen('onNestedDragEnd', (item) => { this.onNestedDragEnd(item) })

            this.$EventDispatcher.listen('onNestedConfirmDelete', (item) => { this.onUseCaseDelete(item) })

            this.$EventDispatcher.listen('onNestedDuplicateItem', (item) => { this.onUseCaseDuplicate(item) })

            this.$EventDispatcher.listen('onNestedEditedItem', (item) => { this.onUseCaseEdited(item) })
        },

        computed: {

            alertNotYetDismissed: function() {

                this.showAlert;
                
                let key = `project${this.id}=open`

                if (document.cookie.split(';').some(function(item) {
                    return item.indexOf(key) >= 0
                })) {
                    return true;
                }

                return false;
            }
        },

        methods: {

            getComponents: function() {

                this.$API.Component.all(this.id)
                .then(res => {
                    this.options = res.data.data
                    this.showAlert = res.data.is_init

                    if ( this.showAlert ) {
                        // add a cookie alert
                        document.cookie = "project"+this.id+"=open";
                    }

                }).then(() => {
                    this.loadingLeft = false
                    // select the first one in the list
                    this.$nextTick( () => {
                        if ( this.options[0] ) {
                            this.$refs['appFeaturesList'].selectItem(this.options[0])
                        }
                    })
                })
            },

            onSelectItem: function (component) {
                //set the selected component
                this.selected = component
                this.getUseCases(component.id)
            },

            getUseCases: function(component_id) {
                this.loadingRight = true
                // get its use cases
                this.$API.UseCase.all(component_id)
                .then(res => {
                    this.useCases = res.data
                }).then(() => {
                    this.loadingRight = false
                })
            },

            /** Updates the sorting of the Components list */
            onDragListEnd: function(p) {
                this.$API.Component.sort(p.item_id, p.item_index + 1).then( () => {
                    this.$notify.message('Saved!')
                })
            },
            /** Updates the parent-child relation of Use Cases, and the sort the index too */
            onNestedDragEnd: function(p) {

                //get the parent index, then set its parent id
                let theItem = {}
                if ( this.useCases[p.parent_index] ) {
                    if ( p.new_parent_id == null ) {
                        Vue.set(this.useCases[p.parent_index], 'parent_id', p.new_parent_id)
                        Vue.set(this.useCases[p.parent_index], 'sort_order', p.parent_index + 1)

                        theItem = this.useCases[p.parent_index]

                    } else {
                        // get the child index, then set its parent_id
                        Vue.set(this.useCases[p.parent_index].children_recursive[p.item_index], 'parent_id', p.new_parent_id)
                        Vue.set(this.useCases[p.parent_index].children_recursive[p.item_index], 'sort_order', p.item_index + 1)

                        theItem = this.useCases[p.parent_index].children_recursive[p.item_index]
                    }

                    this.$notify.message('Saving...')

                    this.$API.UseCase.sort(p.item_id, {
                        parent_id: theItem.parent_id,
                        sort_order: theItem.sort_order
                    })
                }
            },
            // execute newinput event from ButtonToInput.vue component
            onNewInput: function(input) {

                // get the last index from the list
                this.$API.Component.add({
                    name: input.value,
                    project_id: this.id,
                    sort_order: _.findLastIndex(this.options) + 1
                }).then( (res) => {
                    this.options.push(res.data)
                    this.$notify.success('New module added!')
                })
            },
            onConfirmDelete: function(item) {

                this.$notify.message('Deleting...')

                this.$API.Component.delete(item.id).then( () => {
                    // find the index to remove
                    let rIdx = _.findIndex(this.options, ['id', item.id]);
                    // remove from array
                    this.options.splice(rIdx, 1)
                    // reselect the first index
                    if ( this.options[0] ) {
                        this.getUseCases(this.options[0].id)
                    }

                    this.$notify.success('Deleted!')
                })
            },

            onDuplicateItem: function(item) {

                this.$notify.message('Creating...')

                this.$API.Component.duplicate({
                    id: item.id,
                    sort_order: _.findLastIndex(this.options) + 1
                }).then( (res) => {
                    this.options.push(res.data)
                    this.$notify.success('Duplicate created!')
                })
            },

            onNewFeatureInput: function(input) {
                // get the last index from the list
                this.$API.UseCase.add({
                    name: input.value,
                    project_id: this.id,
                    component_id: this.selected.id,
                    sort_order: this.useCases ? _.findLastIndex(this.useCases) + 1 : 1
                }).then( (res) => {
                    this.useCases.push(res.data)
                    this.$notify.success('New feature added!')
                })
                .catch(error => {
                    this.$notify.responseError(error.response)
                })
            },

            onUseCaseDelete(item) {
                this.$notify.message('Deleting...')

                this.$API.UseCase.delete(item.id).then( () => {
                    if ( item.component_id ) {
                        this.getUseCases( item.component_id )
                    }
                    this.$notify.success('Deleted!')
                })
            },

            onUseCaseDuplicate(item) {

                let data = {
                    id: item.id,
                    sort_order: _.findLastIndex(this.useCases) + 1
                };

                // if the item has a parent, get the last index within the same parent
                if ( item.parent_id ) {
                    let parent = _.find(this.useCases, ['id', item.parent_id])
                    // console.log("parent", parent)
                    data.sort_order = parent.children_recursive ? _.findLastIndex(parent.children_recursive) + 1 : 0
                }

                this.$API.UseCase.duplicate(data).then( (res) => {
                    // this.useCases.push(res.data)
                    this.getUseCases( item.component_id )
                    this.$notify.success('Duplicate created!')
                })
            },

            dismissAlert: function() {
                this.showAlert = false
                // rmeove the cookie
                document.cookie = `project${this.id}=closed; Max-Age=-99999999;`;  
            },

            onEditedItem: function(item) {

                this.$API.Component.update(item.id, item)
                    .then( () => {
                        this.$notify.success("Saved!")
                    })
                .catch(error => {
                    // reset back to old name on failure
                    let rIdx = _.findIndex(this.options, ['id', item.id]);
                    this.options[rIdx].name = item.old_name

                    this.$notify.responseError(error.response)
                })
            },

            onUseCaseEdited: function (item) {

                this.$notify.message("Saving...")

                this.$API.UseCase.update(item.id, item)
                    .then( () => {
                        this.$notify.success("Saved!")
                    })
                .catch(error => {

                    let rIdx = _.findIndex(this.useCases, ['id', item.id]);
                    this.useCases[rIdx].name = item.old_name

                    this.$notify.responseError(error.response)
                })

            }

        }
    }
</script>