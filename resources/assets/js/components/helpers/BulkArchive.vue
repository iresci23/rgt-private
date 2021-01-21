<template>
    <div class="bulk-archive">
        <a href="javascript:;" @click="confirm">Archive</a>
        <div class="modal modal-danger fade" tabindex="-1" id="bulk-archive-modal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">
                            <i class="voyager-trash"></i> Archive confirmation 
                        </h4>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to archive (<span id="bulk-archive-count"></span>) {{ slug }}?
                    </div>
                    <div class="modal-footer">

                        <input type="submit" 
                        class="btn btn-danger pull-right" 
                        value="Archive" 
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


                var $bulkModal = $('#bulk-archive-modal');

                $bulkModal.appendTo('body');

                var $checkedBoxes = $('#dataTable input[type=checkbox]:checked');
                var count = $checkedBoxes.length;

                if (count) {

                    $('#bulk-archive-count').html(count)

                    let self = this;

                    $.each($checkedBoxes, function (el) {
                        self.selectedIds.push($(this).val());
                    })

                    $bulkModal.modal('show')

                } else {
                    // No row selected
                    toastr.warning('You haven\'t selected anything to archive');
                }

            },
            proceed () {
                this.$API.Helper.archiveRows(this.slug, this.selectedIds)
                    .then(res => {
                        if(res.status === 200){
                            location.reload()
                        }
                    })
            }
        }
    }
</script>