<template>
<!-- @note: This is a dynamic form holder, please see example implementation at ProjectMediaTab.vue -->
    <ui-modal
        :ref="'ref'+name"
        :title="options.title"
        dismiss-on="close-button"
    >
        <div v-html="options.html"></div>

        <template v-for="(row, index) in form">
            <div class="dynamic-form" :key="index">
                
                <!-- @todo: handle other form field types such as textarea   -->
                <div class="form-group" v-show="!row.hidden">
                    <label class="text-label">{{ row.label }}</label>
                    <ui-textbox 
                        :type="row.type || 'text'"
                        :value="form[index].value" 
                        v-on:input="updateValue($event, index)" 
                        :required="row.required"
                        :minlength="1"
                        :maxlength="80"
                        :invalid="hasError(row.field)"
                    v-if="row.layout == 'text-input'"></ui-textbox>
                </div>

            </div>
        </template>

        <div slot="footer">
            <ui-button color="primary" @click="onSave">{{ options.confirmButtonText }}</ui-button>
            <ui-button color="default" @click="close">{{ options.denyButtonText }}</ui-button>
        </div>
    </ui-modal>
</template>
<script>
export default {
    props: {
        name: { required: true }
    },
    data () {
        return {
            options: {
                title: '',
                html: '',
                confirmButtonText: 'Save',
                denyButtonText: 'Cancel',
            },
            form: [],
            errors: []
        }
    },
    methods: {
        set: function(options, data) {

            Object.assign(this.options, options);
            Object.assign(this.form, data);

            this.form = data

            return this
        },
        updateValue: function(value, index) {
            // make the object reactive by using Vue.set
            Vue.set( this.form[index], 'value', value )
        },
        open: function () {
            this.$refs['ref'+this.name].open();
        },
        close: function () {
            this.$refs['ref'+this.name].close();
        },
        onSave: function () {
            
            let data = {}

            this.errors = []

            /** validate form */ 
            for (var i = 0; i < this.form.length; i++) {
                let row = this.form[i];

                if ( row.required && !row.value ) {
                    this.errors.push(row.field)
                } else {
                    if ( row.type == 'email' && !this.validEmail(row.value) ) {
                        this.errors.push(row.field)
                    }
                }
            }

            if ( !this.errors.length  ) {

                /** emit data when no more errors */
                for (var i = 0; i < this.form.length; i++) {
                    let row = this.form[i];
                    Vue.set(data, row.field, row.value )
                }
                
                this.$emit('save', data)
                this.close()
            }

        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        hasError: function (key) {
            return _.includes(this.errors, key);
        },
    }
}
</script>