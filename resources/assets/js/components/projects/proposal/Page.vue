<template>
    <div class="row">
        <div class="left-panel col-sm-12 col-md-3">
            
            <bullet-list-loader v-if="loadingLeft"></bullet-list-loader>

            <draggable-list 
                ref="proposalList"
                name="proposal-list"
                v-if="!loadingLeft"
                :options="questions"
                v-on:selectItem="onSelectItem" 
                v-on:dragListEnd="onDragListEnd"
                v-on:confirmDelete="onConfirmDelete"
                v-on:duplicateItem="onDuplicateItem"
                v-on:editedItem="onEditedItem"
                delete-message="Are you sure you want to permanently delete this section and all the contents?"
                >
            </draggable-list>


            <button-to-input 
                value=""
                label="Add New Section"
                v-on:newinput="onNewInput"
            ></button-to-input>

        </div>
        <div class="right-panel col-sm-12 col-md-9">

            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <h3 class="title" v-if="selected && selected.name == 'Estimates'">{{ selected.name }}</h3>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <div class="flex flex-end">
                        <button class="btn btn-default with-min-width">Preview</button> &nbsp;&nbsp;
                        <button class="btn btn-primary">Generate Proposal <span class="material-icons">expand_more</span></button>
                    </div>
                </div>
            </div>

            
            <bullet-list-loader v-if="loadingRight"></bullet-list-loader>

            <component v-if="selected && selected.layout != 'widget-only'" 
                :ref="'editorRow' + selected.id" 
                v-bind:is="selected.layout" 
                :key-id="selected.id" class="editor"
                :value.sync="selected.answer.answer"
                @onAutoSave="onAutoSave" >
            </component>

            <!-- show if it has any widgets -->
            <component v-if="selected && selected.trigger_widget" 
                :ref="'qWidget' + selected.id" 
                v-bind:is="selected.trigger_widget" 
                :key-id="selected.id"
                :projectId="id"
                :value.sync="selected.options">
            </component>

        </div>
    </div>
</template>

<script>
    export default { 
        
        props: {
            id: { required: true }, // project ID
            name: { required: false }
        },

        data() {
            let self = this
            return {
                questions: [],
                selected: null,
                loadingRight: false,
                loadingLeft: false
            }
        },

        beforeMount() {

            this.$EventDispatcher.listen('onProposalTabLoad', () => { 
                if ( ! route().current('Project.proposal') ) {  
                    location.href = route('Project.proposal', this.id)
                }
            })
        },

        mounted() {

            this.selected = null

            if ( route().current('Project.proposal') ) {  this.getQuestions()  }

            this.$EventDispatcher.listen('onTimeCostTableDelete', (keyId) => {
                this.$notify.message("Deleting...")
                /** set the trigger_widget to null in order to delete the table */
                this.$API.Question.update(keyId, {
                    trigger_widget: null
                })
                .then( (res) => {
                    this.selected.trigger_widget = null
                    this.$notify.success("Table deleted!")
                })
            })
        },

        methods: {

            getQuestions: function() {
                
                this.loadingLeft = true
                this.selected = null
                this.$API.Helper.getQuestions(this.id, 'proposal')
                    .then(res => {
                        this.questions = res.data
                        this.loadingLeft = false

                        // select the first one in the list
                        this.$nextTick( () => {
                            if ( this.questions[0] ) {
                                this.$refs['proposalList'].selectItem(this.questions[0])
                            }
                        })
                    })
            },

            onSelectItem: function(component) {

                this.loadingRight = true

                this.selected = null

                /** Remove the rich editor if it is widget only component */
                if ( component.layout == 'widget-only' 
                    && window.editor && window.editor.state == 'ready' ) {
                    window.editor.destroy()
                    .catch( error => {
                        console.log( error );
                    });
                }

                this.$nextTick( () => {
                    this.selected = component
                    this.loadingRight = false
                })
            },

            onAutoSave: function(data) {

                this.$notify.message('Saving...')

                this.$API.Helper.saveAnswer(this.id, data)
                    .then(res => {

                        let index = _.findIndex(this.questions, ['id', data.key])
                        
                        if ( this.questions[index] ) {
                            Vue.set(this.questions[index], 'answer', res.data )
                        }

                        this.$notify.success('All changes are saved!')
                    })
            },
            
            /**
             * Updates the sorting of the Components list
             */
            onDragListEnd: function(p) {

                this.$notify.message('Saving...')

                // get the ids with new order indexes
                let ids = [];
                $('div#proposal-list').find('li.list-group-item').each(function() {
                    ids.push($(this).attr('data-id'))
                });

                if ( ids ) {
                    this.$API.Helper.saveSort(ids, 'Question')
                    .then(res => {
                        this.$notify.success('Saved!')
                    })
                }

            },

            onNewInput: function(input) {

                /** get the last index from the list */ 
                this.$API.Question.add({
                    question: input.value,
                    section: 'proposal',
                    layout: 'text-editor',
                    project_id: this.id,
                    sort_order: _.findLastIndex(this.questions) + 1
                }).then( (res) => {
                    this.questions.push(res.data)
                    this.$notify.success('New section added!')
                })
            },
            
            onConfirmDelete: function(item) {

                this.$notify.message('Deleting...')

                this.$API.Question.delete(item.id).then( () => {
                    // find the index to remove
                    let rIdx = _.findIndex(this.questions, ['id', item.id]);
                    // remove from array
                    this.questions.splice(rIdx, 1)

                    this.$notify.success('Deleted!')
                })
            },

            onDuplicateItem: function(item) {

                this.$notify.message('Creating...')

                this.$API.Question.duplicate({
                    id: item.id,
                    sort_order: _.findLastIndex(this.questions) + 1
                }).then( (res) => {
                    this.questions.push(res.data)
                    this.$notify.success('Duplicate created!')
                })
            },

            onEditedItem: function(item) {

                this.$API.Question.update(item.id, {
                    question: item.name
                })
                .then( (res) => {
                    this.$notify.success("Saved!")
                })
                .catch(error => {
                    // reset back to old name on failure
                    let rIdx = _.findIndex(this.questions, ['id', item.id]);
                    this.questions[rIdx].name = item.old_name
                    
                    this.$notify.responseError(error.response)
                })

            },
        }
    }
</script>