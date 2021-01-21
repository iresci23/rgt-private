<template>
    <div class="project-form">
        <div class="modal modal-default fade" tabindex="-1" id="project-form-modal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header with-border">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">
                            {{ form.id ? 'Edit' : 'Create New' }} Project
                        </h4>
                    </div>
                    <div class="modal-body">
                        
                        <div class="row">
                        
                            <div class="col-sm-12">

                                <div class="form-group">
                                    <label class="text-label">Project Name</label>
                                    <ui-textbox
                                        v-model="form.name"
                                        :invalid="hasError('name')"
                                    ></ui-textbox>
                                </div>

                                <!-- <div class="col-sm-12">
                                    <div class="form-group">
                                        <ui-select
                                            placeholder="Project Company"
                                            :options="clients"
                                            v-model="client"
                                            :invalid="hasError('client_id')"
                                        ></ui-select>
                                    </div>
                                </div> -->

                                <div class="form-group" v-if="types">
                                    <label class="text-label">Project Type</label>
                                    <ui-select
                                        :options="types"
                                        v-model="type"
                                        :invalid="hasError('type_id')"
                                    ></ui-select>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div class="modal-footer">

                        <input type="submit" 
                        class="btn btn-primary pull-right" 
                        value="Save" 
                        @click="submit">

                        <button type="button" class="btn btn-default pull-right" data-dismiss="modal">
                            Cancel
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    id: 0,
                    name: null,
                    type_id: null,
                    client_id: null,
                },
                type: '',
                client: '',
                types: [],
                clients: [],
                errors: []
            }
        },
        mounted() {
        },
        methods: {
            set (id) {

                let self = this
                if ( id ) {

                    self.form = {
                        id: id,
                        name: null,
                    }

                    // if edit mode, let's load the project info
                    this.preload(() => {
                        self.$API.Project.get(id)
                            .then(res => {
                                let data = res.data

                                self.form = {
                                    id: data.id,
                                    name: data.name,
                                    type_id: data.type.id,
                                    client_id: data.client.id,
                                }

                                // set the selected option of the dropdown 
                                self.type = {
                                    id: data.type.id,
                                    name: data.type.name
                                }
                                
                                self.client = {
                                    id: data.client.id,
                                    name: data.client.name
                                }
                            })
                    })
                } else {
                    self.form.id = 0
                    self.form.name = ''
                    this.preload()
                }

                return this;
            },

            preload (callback) {

                let self = this
                Promise.all([self.$API.Project.getTypes()]) //self.$API.Client.all()
                .then(function (results) {
                    self.types = results[0].data;
                    // self.clients = results[1].data;
                    callback && callback()
                });
            },

            open () {
                var $modal = $('#project-form-modal');
                    $modal.appendTo('body');
                    $modal.modal('show')
            },
            close () {
                $('#project-form-modal').modal('hide')
            },
            submit () {

                let self = this

                this.form.type_id = this.type.id;
                this.form.client_id = 1; //this.client.id;

                this.$API.Project.save(this.form)
                    .then(res => {
                        self.$notify.success('Saved!')
                        self.close()
                        self.$EventDispatcher.fire('onProjectSave')
                    }).catch(error => {
                        self.errors = error.response.data.errors
                    });
            },
            hasError: function (key) {
                return this.errors.hasOwnProperty(key)
            },
        }
    }
</script>