<template>
    <div class="media-manager">
        <div class="row">

            <div class="col-sm-12">
                <div class="flex">
                    <ui-fileupload ref="refFileUploader" multiple name="media" @change="handleFileUpload">+ Upload Files</ui-fileupload>
                    <ui-button class="ml-1" @click="newFolder">+ New Folder</ui-button>
                </div>
            </div>

            <div class="col-sm-6">
                <ul class="list-group">
                    <li class="list-group-item list-header active">
                        <div class="flex w100">
                            <h5 class="flex-grow-1 cursor-pointer" @click="sort">Name <i :class="{'voyager-angle-down' : sortDir == 'asc', 'voyager-angle-up' : sortDir == 'desc'}"></i></h5>
                            <ui-button @click="goBack(backPath.path)"  icon="arrow_back" class="pull-right" :disabled="currentPath == projectPath">Back</ui-button>
                        </div>
                    </li>
                    <li v-if="fileList.length <= 0" class="list-group-item">
                         <ui-progress-circular color="multi-color" v-if="loading"></ui-progress-circular>
                         <span v-else>No Files</span>
                    </li>
                    <template v-for="(file,idx) in fileList">
                        <li class="list-group-item cursor-pointer" :key="idx" :id="'file-item-'+idx">
                            <div class="flex w100">
                                <div class="flex flex-grow-1" 
                                     @click="getFilesByProject(file.path, file.is_dir)">

                                    <i class="voyager-folder" v-if="file.is_dir"></i>

                                    <span class="text-label">{{file.name}}</span>

                                </div>
                                <span class="material-icons" @click="showEdit('refModalEdit', file)">edit</span>
                                <span class="material-icons" @click="showConfirm('refConfirmDelete', file)">delete</span>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>

        </div>
    
        <!-- Delete -->
        <modal-confirm 
            ref="refConfirmDelete" 
            name="deleteModal" 
            v-on:confirm="onConfirmDelete">
        </modal-confirm>

        <!-- Rename -->
        <modal-form 
            ref="refModalEdit" 
            name="editModal" 
            v-on:save="onRename">
        </modal-form>

    </div>
</template>

<script>

let downloader = require("downloadjs");

export default {
    props: ['id'],

    data () {
        return {
            fileList: [],
            backPath: {
                path: '',
                name: ''
            },
            projectPath: `public/projects/${this.id}`,
            currentPath: this.projectPath,
            uploadList: [],
            contextMenu: [{key:'rename', name: 'Rename'},{key:'delete', name: 'Delete'}],
            sortDir: '',
            loading: false
        }
    },

    mounted () {

        this.$EventDispatcher.listen('onDocTabLoad', () => {
            this.getFilesByProject('', true, 'forward')
        })
    },

    methods: {
        // New Folder will create a new folder on top of the list 
        newFolder () {

            let data = {
                name: 'New Folder',
                path: this.currentPath
            }

            this.$API.MediaManager.saveDirectory(data)
            .then(res2 => {
                this.$notify.success('Folder created!')
                this.getFilesByProject(data.path, true)
            })
            .catch(error => {
                console.log(error.response)
            });
        },

        goBack (path) {

            /* Only limit backward to the project dir */
            if (path == 'public/projects' || path == this.projectPath) {
                alert("You are already in the root directory.");
                return false;
            }

            this.getFilesByProject(path, true, 'backward')

        },

        getFilesByProject (path, is_dir, direction = 'forward') {

            if (direction == 'backward') {
                path = this.backPath.path
            }

            this.loading = true
            
            this.$API.MediaManager.getFilesByProject(this.id, path, is_dir)
            .then(res => {

                let result = res.data;  

                if (result.success) {

                    this.fileList = result.data.folders

                    this.currentPath = result.data.path

                    this.backPath.path = result.data.parent_path

                    this.projectPath = result.data.project_path

                    Array.prototype.push.apply(this.fileList, result.data.files)

                } else {

                    /* Downloads the file directly from the browser */
                    downloader(path);
                }
            })
            .catch(error => {
                console.log(error.response)
            })
            .then( () => {
                this.sortDir = ''
                this.loading = false
            });

        },

        sort () {

            let sort = this.sortDir || 'asc', self = this;

            this.fileList.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();

                let returnValue = 0;

                if ( sort == 'asc') {
                    returnValue = (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    self.sortDir = 'desc';
                } else {
                    returnValue = (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
                    self.sortDir = 'asc';
                }

                return returnValue;
            });
        },

        /**
         *
         * Handle upload functions
         *
         */
        handleFileUpload (files, event) {
            
            var file, self = this;

            this.$notify.message('Uploading...')

            // loop through files
            for (var i = 0; i < files.length; i++) {
                // get item
                file = files.item(i);

                let form = new FormData();
                form.append('file', file);
                form.append('current_path', this.currentPath);

                this.$API.MediaManager.upload(form)
                .then(res => {
                    if (res.status == 200) {
                        this.getFilesByProject(self.currentPath, true)
                        this.uploadList = []
                        this.$refs.refFileUploader.clear()
                    }
                })
            }
        },

        showConfirm(ref, file) {

            let html = ( file.is_dir ) ? 
                `Are you sure you want to permanently delete this folder and all the files contained in it?` 
                : `Are you sure you want to permanently delete this file?`;

            this.$refs[ref].set({
                title: `Delete ${ file.is_dir ? 'Folder' : 'File' }?`,
                html: html,
                confirmButtonText: 'Delete'
            }, file).open()
        },

        onConfirmDelete: function(file) {

            let self = this

            self.$API.MediaManager.delete(file)
                .then(res => {

                let success = res.data.success

                if (success) {
                    self.getFilesByProject(self.currentPath, true)
                } else {
                    self.$notify.error('Something went wrong!')
                }
                
            })
            .catch(error => {
                console.log(error.response)
            })
        },

        showEdit: function(ref, file) {

            let dir_path = file.is_dir ? file.parent_path : file.dir_path
            /**
             * Note: This uses ModalForm.vue, a component accepting dynamic fields
             * @params options for Modal options such as Title
             * @params form for Modal form containing the field info
             */
            this.$refs[ref].set({
                title: `Rename ${ file.is_dir ? 'Folder' : 'File' }`,
                html: '',
                confirmButtonText: 'Save'
            }, [
                { field: 'name', layout: 'text-input', label: 'Name', value: file.name, hidden: false, required: true },
                { field: 'original', layout: 'text-input', label: 'Original', value: file.name, hidden: true, required: true },
                { field: 'dir_path', layout: 'text-input', label: 'Path', value: dir_path, hidden: true, required: true },
                { field: 'is_dir', layout: 'text-input', label: 'Type', value: (file.is_dir).toString(), hidden: true, required: true },
            ]).open()
        },

        onRename: function (file) {

            let self = this

            if ( !file.name ) {
                this.$notify.error('Invalid name')
                return;
            }

            this.$notify.message('Renaming...')

            self.$API.MediaManager.update(file)
                .then(res => {
                let success = res.data.success

                if (success) {
                    self.getFilesByProject(self.currentPath, true)
                    self.$notify.success('Renamed!')
                } else {
                    self.$notify.error( res.data.message )
                }
            })
            .catch(error => {
                console.log(error.response)
                this.$notify.error(error.response)
            })
        }
        
    },
    components: {
        'modal-confirm': require('../../helpers/ModalConfirm.vue').default,
        'modal-form': require('../../helpers/ModalForm.vue').default
    }
}
</script>