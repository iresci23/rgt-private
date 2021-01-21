<template>
    <div class="widget target-group-widget">
        <div class="col-sm-12">
            <label class="text-label">User Roles - Who are your customer target groups?</label>
        </div>
        <div class="col-sm-12">
            <div class="list col-sm-3 p-0">
                <draggable
                    :list="groups"
                    class="list-group"
                    ghost-class="ghost"
                    @start="dragging = true"
                    @end="onDragEnd"
                    handle=".handle"
                >
                    <li v-for="group in groups" :class="{ 'active' : group.id == selectedGroup.id }"
                        :data-id="group.id"
                        class="list-group-item cursor-pointer" 
                        @click="selectGroup(group)" :key="group.id">
                        <span class="material-icons handle">drag_handle</span> {{ group.name }}
                    </li>
                </draggable>

                <button-to-input 
                    value=""
                    label="Add Another Group"
                    v-on:newinput="onNewInput"
                ></button-to-input>
            </div>

            <div class="form col-sm-9">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-sm-4">Name:</label>
                        <div class="col-sm-8">
                          <ui-textbox :multi-line="false" v-model="selectedGroup.name" placeholder="Ex. Real Estate Agents, Homeowners, Stay-at-Home Moms"></ui-textbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label  col-sm-4">What should this user be able to do?</label>
                        <div class="col-sm-8">
                          <ui-textbox :multi-line="true" v-model="selectedGroup.user_able_to_do"></ui-textbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label  col-sm-4">What should this user not have access to?</label>
                        <div class="col-sm-8">
                          <ui-textbox :multi-line="true" v-model="selectedGroup.user_access_to" placeholder="Ex. Should not be able to access financial reports"></ui-textbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label  col-sm-4">What are the three main actions that this user is supposed to do?</label>
                        <div class="col-sm-8">
                          <ui-textbox :multi-line="true" v-model="selectedGroup.user_main_actions"></ui-textbox>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <ui-collapsible title="Demographics">
                                <div class="row">
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Age:</label>
                                        <div class="col-sm-12 col-md-3">
                                            <input 
                                            v-model="selectedGroup.demographics.age" 
                                            type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Location:</label>
                                        <div class="col-sm-12 col-md-3">
                                            <input 
                                            v-model="selectedGroup.demographics.location" 
                                            type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Gender:</label>
                                        <div class="col-sm-12 col-md-3">
                                            <input 
                                            v-model="selectedGroup.demographics.gender" 
                                            type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Income Level:</label>
                                        <div class="col-sm-12 col-md-3">
                                            <input 
                                            v-model="selectedGroup.demographics.income_level" 
                                            type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Occupation:</label>
                                        <div class="col-sm-12 col-md-3">
                                            <input 
                                            v-model="selectedGroup.demographics.occupation" 
                                            type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Education Level:</label>
                                        <div class="col-sm-12 col-md-3">
                                            <input 
                                            v-model="selectedGroup.demographics.education_level" 
                                            type="text" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </ui-collapsible>
                        </div>  
                    </div>

                    <div class="row">

                        <div class="col-sm-12">
                            <ui-collapsible title="Psychographics">
                                <div class="row">
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Personality:</label>
                                        <div class="col-sm-8">
                                            <ui-textbox :multi-line="true" 
                                                v-model="selectedGroup.psychographics.personality" 
                                                placeholder="Examples. Type A vs detail-oriented and methodical, extroverted vs introverted, serious vs. fun, simple vs. complex">
                                            </ui-textbox>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-4">Interest / Hobbies:</label>
                                        <div class="col-sm-8">
                                            <ui-textbox :multi-line="true" 
                                                v-model="selectedGroup.psychographics.interest" 
                                                placeholder="Examples: technology, health and fitness, entrepreneurship">
                                            </ui-textbox>
                                        </div>
                                    </div>
                                </div>
                            </ui-collapsible>
                        </div>
                    </div>
                    
                    <div class="col-sm-12">
                        <a href="javascript:;" @click="save()" class="btn btn-primary">
                            Save Changes
                        </a>
                    </div>   
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import draggable from 'vuedraggable'

    export default {
        props: {
            projectId: { required: true },
            qWidgetId: { required: true }
        },

        data () {

           return {
            groups: [],
            selectedGroup: {},
            emptyForm: {
                id: null,
                name: null,
                user_able_to_do: null,
                user_access_to: null,
                user_main_actions: null,
                demographics: {
                    age: null,
                    location: null,
                    gender: null,
                    income_level: null,
                    occupation: null,
                    education_level: null
                },
                psychographics: {
                    personality: null,
                    interest: null
                }
            },
            dragging: false
           }
        },

        created () {
            this.selectedGroup = this.emptyForm
        },

        mounted () {
            
            this.$API.Project.getTargetGroups(this.projectId, this.qWidgetId)
              .then(res => {
                this.groups = res.data
              })

        },

        methods: {

            selectGroup (group) {
                this.selectedGroup = group
            },

            save () {

                if (!this.selectedGroup.name)
                    return  toastr.error('Target group name is required');
                    // return this.$message.error('Target group name is required')

                this.$notify.message('Saving...')

                this.selectedGroup.project_id = this.projectId
                this.selectedGroup.question_widget_id = this.qWidgetId

                this.$API.Project.saveTargetGroup(this.selectedGroup)
                  .then(res => {

                    let result = res.data
                    let record = result.record

                    if (result.is_new) {
                        this.groups.push(record)

                        this.$notify.success('Created!')

                    } else {
                        
                        this.$notify.success('Saved!')
                    }
                    
                    this.selectedGroup = record

                  })
            },
            // execute newinput event from ButtonToInput.vue component
            onNewInput: function(data) {
                // reset the form
                this.selectedGroup = this.emptyForm
                // set the name
                this.selectedGroup.name = data.value
                // call save to database
                this.save()
            },
            
            onDragEnd: function (e) {
                this.dragging = false

                this.$notify.message('Saving...')

                // get the ids with new order indexes
                let ids = [];
                $('li.list-group-item').each(function() {
                    ids.push($(this).attr('data-id'))
                });

                if ( ids ) {
                    this.$API.Helper.saveSort(ids, 'TargetGroup')
                    .then(res => {
                        this.$notify.success('Saved!')
                    })
                }
            },
        },
        components: {
            'button-to-input': require('../helpers/ButtonToInput.vue').default,
            draggable
        }
    }
</script>