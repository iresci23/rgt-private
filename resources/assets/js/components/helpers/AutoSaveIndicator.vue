<template>
    <label class="auto-save-indicator" :class="type" v-if="text">
        <span class="material-icons" v-if="icon">{{ icon }}</span>
        {{ text }}
    </label>
</template>

<script>
    export default {
       data() {
       	return {
            icon: null,
            type: 'default',
       		text: null
       	}
       },

       methods: {
            message(message) {
                this.icon = null
                this.type = 'default'
                this.text = message
            },
            success(message) {
                this.icon = 'check_circle_outline'
                this.type = 'success'
                this.text = message
            },
            error(message) {
                this.icon = 'error_outline'
                this.type = 'error'
                this.text = message
            },
            clear() {
                this.icon = null
                this.type = null
                this.text = null
            }
       },

       watch: {
           text: function() {

               if ( this.type == 'success' ) {
                setTimeout(() => {
                    this.text = null
                }, 2000);
               } else if ( this.type == 'error' ) {
                setTimeout(() => {
                    this.text = null
                }, 4000);
               } else {
                setTimeout(() => {
                    this.text = null
                }, 2000);
               }
           }
       }
    }
</script>
