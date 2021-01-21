<template>
    <ui-confirm
        :ref="'ref'+name"
        :title="options.title"
        :confirmButtonText="options.confirmButtonText"
        :denyButtonText="options.denyButtonText"
        @confirm="onConfirm"
        :class="type"
        autofocus="none"
    >
        <div v-html="options.html"></div>
    </ui-confirm>
</template>
<script>
export default {
    props: {
        name: { required: true },
        data: { required: false, default: Object },
        type: { required: false, default: 'default' }
    },
    data () {
        return {
            options: {
                title: '',
                html: '',
                confirmButtonText: 'OK',
                denyButtonText: 'Cancel',
            },
            item: this.data,
        }
    },
    methods: {
        set: function(options, data) {

            Object.assign(this.options, options);
            Object.assign(this.item, data);

            return this
        },
        open: function () {
            this.$refs['ref'+this.name].open();
        },
        onConfirm: function () {
            this.$emit('confirm', this.item)
        }
    },
}
</script>