<template>
    <div class="bulk-restore" :id="id">

        <a href="javascript:;" 
        class="btn btn-sm btn-warning pull-right edit"
        @click="confirm">
        <i class="voyager-refresh"></i> 
        <span class="hidden-xs hidden-sm">
        {{ displayAction }}
        </span></a>

        <div class="bulk-restore-modal modal modal-success fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">
                            <i class="voyager-refresh"></i> {{ displayAction }} "<i>{{ label }}</i>" ? 
                        </h4>
                    </div>
                    <div class="modal-footer">
                        <input type="submit" 
                        class="btn btn-success pull-right" 
                        :value="displayAction" 
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
        props: [ 'id', 'label', 'slug' , 'status' ],
        data() {
            return {
                displayAction: (this.status == 'archived') ? 'Unarchive' : 'Restore'
            }
        },
        methods: {

            confirm () {


                var $bulkModal = $(`#${this.id} .bulk-restore-modal`);

                if (this.id) {

                    $bulkModal.modal('show')

                } else {
                    // No row selected
                    toastr.warning(`You haven't selected anything to ${this.displayLabel}`);
                }

            },
            proceed () {
                this.$API.Helper.restoreRow(this.slug, this.id, this.status)
                    .then(res => {
                        if(res.status === 200){
                            location.reload()
                        }
                    })
            }
        }
    }
</script>