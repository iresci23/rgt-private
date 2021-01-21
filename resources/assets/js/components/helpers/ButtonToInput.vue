<template>
    <div class="button-to-input">
        <a href="javascript:;" @click="toInput()" class="btn btn-default" v-if="!is_input">
            <span class="material-icons">add_box</span> {{ label }}
        </a>
        <div class="flex" v-else>
            <ui-textbox v-model="getValue" @keydown-enter="onSave()" :autofocus="true"></ui-textbox>
            <div>
                <a href="javascript:;" @click.stop="onSave(true)" class="btn-plus"><span class="material-icons"> + </span></a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        label: { required: true, default: 'Add New Module' },
        value: { required: false },
    },
    data () {
        return {
            is_input: false,
            getValue: this.value || ''
        }
    },
    methods: {
        toInput: function () {

            this.is_input = true
        },
        /**
         * Note: specific saving functions must be handled on parent component via listening to newinput event
         * do not add saving functions from here!
         */
        onSave: function (validate) {
            
            if ( this.getValue ) {

                this.is_input = false

                this.$emit('newinput', {
                    value: this.getValue
                })

                this.getValue = ""
            } else if ( validate ) {
                this.$notify.error("Component name is required")
                return;
            }
        }
    }
}
</script>