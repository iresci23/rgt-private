<template>
    <div class="grid-table">

        <div class="row">
            <div class="col-sm-12 col-md-8">

                <ui-radio-group
                    name="statefilter"
                    class="toggle-radio-group"
                    :options="['Active', 'Archived', 'Deleted']"
                    v-model="state"
                    @change="getList"
                ></ui-radio-group>

            </div>
            <div class="col-sm-12 col-md-4">
                <ui-textbox icon="search" placeholder="Search" v-model="keyword" @keydown-enter="getList"></ui-textbox>
            </div>

            <div class="col-sm-12">
                <ag-grid-vue style="width: 100%; height: 100%;"
                    class="ag-theme-alpine"
                    :columnDefs="columnDefs"
                    :rowData="rowData"
                    :rowClassRules="rowClassRules"
                    domLayout="autoHeight"
                    @gridReady="onGridReady"
                    @cellMouseOver="cellMouseOver"
                    @cellMouseOut="cellMouseOut">
                </ag-grid-vue>
                <div id="context-menu-items" class="context-menu-wrapper" style="display: none;">
                    <div class="context-menu">
                        <ul>
                            <li v-for="(opt, idx) in dotOptions" :key="idx" @click="doRowAction($event, opt)">{{ opt }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <modal-confirm 
            ref="refModalConfirm" 
            name="modalConfirm" 
            v-on:confirm="onModalConfirm">
        </modal-confirm>

    </div>
</template>

<script>

import { AgGridVue } from 'ag-grid-vue';

export default {
    data() {
        return {
            columnDefs: null,
            rowData: null,
            state: 'Active',
            keyword: null,
            dotOptions: ['Edit','Delete','Archive'],
        }
    },
    components: {
        AgGridVue,
        'modal-confirm': require('../helpers/ModalConfirm.vue').default,
    },
    beforeMount() {

        this.columnDefs = [
            { headerName: 'Project Name', field: 'name', sortable: true, 
                cellRenderer: function(params) {
                    return `<span class="flex-grow-1 project-name"><a href="${ route('Project.sales', params.data.id) }">${params.value}</a></span>`
                }
            },
            { headerName: 'Project Type', field: 'type.name', sortable: true, hide: window.innerWidth < 768 },
            { headerName: 'Date Created', field: 'created_at', sortable: true, hide: window.innerWidth < 768 },
            { headerName: '', field: 'id', width: 30,
                valueGetter: function(params) {
                    return '';
                }, 
                cellRenderer: function (params) {
                    return `<div class="dot-wrapper hidden" id="dot-wrapper-${params.data.id}">
                                <span class="material-icons icon-more-vertical dot-btn" data-id="${params.data.id}">more_vert</span>
                             </div>`;
                }
            }
        ];

        this.rowClassRules = {
            'active-row': 'data.state == "Active"',
            'archived-row': 'data.state == "Archived"',
            'deleted-row': 'data.state == "Deleted"',
        };

        this.getList()
    },
    mounted() {

        let self = this

        self.$EventDispatcher.listen('onProjectSave', () => {
           self.getList()
        })

        /** Bind click to close the context menu */
        $(document).bind('click', function(e) {
            if ($('#context-menu-items').is(":visible")) {
                /** the context menu is visible, so we close it when user clicks outside of it */
                if(!$(e.target).is('#context-menu-items') && !$(e.target).is('.dot-btn')) {
                    self.hideContextMenu()
                }
            }
        });
    },
    methods: {
        getList: function() {
            this.hideContextMenu()
            this.$notify.message('Loading...')
            this.$API.Project.all({
                state: this.state,
                keyword: this.keyword
            }).then(res => {
                this.rowData = res.data
            }).catch(error => {
                self.errors = error.response.data.errors
            });
        },
        onGridReady: function(e) {
            e.api.sizeColumnsToFit();
        },
        getRowClass: function (params) {
            return params.data.state;
        },
        /** Show dot icon when a cell / row is hovered */
        cellMouseOver: function(params) {

            let rowId = params.data.id
            let rowName = params.data.name
            let dotElement = $('div#dot-wrapper-'+rowId)

            if ( params.data.state == 'Deleted' ) {
                this.dotOptions = ['Restore'];
            } else if ( params.data.state == 'Archived' ) {
                this.dotOptions = ['Delete','Unarchive'];
            } else {
                this.dotOptions = ['Edit','Delete','Archive'];
            }

            /** Show the dot wrapper */
            dotElement.removeClass('hidden');

            /** Show the context menu when dot is clicked */
            $('.dot-btn').unbind('click').bind('click', function(e) {

                console.log("button offset",  e.target.getBoundingClientRect())
                let offset = e.target.getBoundingClientRect()

                $('#context-menu-items').attr('data-id', rowId)
                $('#context-menu-items').find('li').attr("data-id", rowId)
                $('#context-menu-items').find('li').attr("data-name", rowName)

                if ( window.innerWidth <= 768 ) {

                    alert("Todo: display context menu as popup in mobile ")
                    // $('#context-menu-items').css({ 
                    //     top: offset.top,
                    //     right: 80,
                    //     position: 'absolute',
                    //     display: 'block'
                    // });
                } else {

                    $('#context-menu-items').css({ 
                        top: offset.top - 200,
                        right: 220,
                        position: 'absolute',
                        display: 'block'
                    });
                }

            });
        },
        /** Remove the dot btn */
        cellMouseOut: function(params) {
            $('div.dot-wrapper').removeClass('hidden').addClass('hidden')
        },
        /** Actions for the context menu */
        doRowAction: function(e, action) {

            this.hideContextMenu()

            let rowId =  $(e.target).attr('data-id')
            let rowName =  $(e.target).attr('data-name')

            if ( action != 'Edit' ) {

                /** Show confirm modal */
                this.$refs['refModalConfirm'].set({
                    title: `Confirm ${action}`,
                    html: `Are you sure you want to ${ action.toLowerCase() } <b>${ rowName }</b>?`,
                    confirmButtonText: action
                }, {
                    id: rowId,
                    action: action
                }).open()

            } else {
                /** Show edit form */
                this.$root.$refs.refProjectForm.set(rowId).open()
            }

        },
        hideContextMenu: function() {
            $('#context-menu-items').hide()
        },
        /** Perform logic after confirming action from the modal */
        onModalConfirm: function(item) {

            if ( item.action == 'Delete' ) {

                this.$API.Helper.deleteRows('projects', [item.id])
                    .then(res => {
                        this.getList()
                    })

            } else if ( item.action == 'Archive' ) {

                this.$API.Helper.archiveRows('projects', [item.id])
                    .then(res => {
                        this.getList()
                    })

            } else if ( item.action == 'Restore' ) {

                this.$API.Helper.restoreRow('projects', item.id, 'deleted')
                    .then(res => {
                        this.getList()
                    })

            } else if ( item.action == 'Unarchive' ) {

                this.$API.Helper.restoreRow('projects', item.id, 'archived')
                    .then(res => {
                        this.getList()
                    })
            }

        }
    },
   
}
</script>