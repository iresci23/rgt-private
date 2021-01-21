<template>
    <div class="bulk-delete">
        <a href="javascript:;" @click="confirm">Delete</a>
        <div class="modal modal-danger fade" tabindex="-1" id="bulk-delete-modal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">
                            <i class="voyager-trash"></i> Delete confirmation 
                        </h4>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete (<span id="bulk-delete-count"></span>) {{ slug }}?
                    </div>
                    <div class="modal-footer">

                        <input type="submit" 
                        class="btn btn-danger pull-right" 
                        value="Delete" 
                        @click="proceed">

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
        props: [ 'slug' ],
        data() {
            return {
                selectedIds: []
            }
        },
        methods: {

            confirm () {


                var $bulkDeleteModal = $('#bulk-delete-modal');

                $bulkDeleteModal.appendTo('body');

                var $checkedBoxes = $('#dataTable input[type=checkbox]:checked');
                var count = $checkedBoxes.length;

                if (count) {

                    $('#bulk-delete-count').html(count)

                    let self = this;

                    $.each($checkedBoxes, function (el) {
                        self.selectedIds.push($(this).val());
                    })

                    $bulkDeleteModal.modal('show')

                } else {
                    // No row selected
                    toastr.warning('You haven\'t selected anything to delete');
                }

            },
            proceed () {
                this.$API.Helper.deleteRows(this.slug, this.selectedIds)
                    .then(res => {
                        if(res.status === 200){
                            location.reload()
                        }
                    })
            }
        }
    }
</script>
