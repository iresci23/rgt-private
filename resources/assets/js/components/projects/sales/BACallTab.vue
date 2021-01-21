<template>
  <div class="ba-call">
    <div class="row">

        <template v-for="(row,index) in questions">
          
          <div class="dynamic-form col-sm-12"  :key="index">
            <!-- Show the form when layout is not a widget -->
            <div v-if="row.layout != 'widget'" class="col-sm-12">
              <component 
                :ref="'questionRow' + row.id" 
                :is="row.layout" :label="row.question"
                :key-id="row.id" :value.sync="row.answer.answer"
                :row="row"
                v-on:triggerwidget="onWidgetTrigger">
              </component>
            </div>

            <div class="col-sm-12" v-else>
              <!-- If it is a widget, only show the question label -->
              <div class="form-group">
                <label class="text-label">{{ row.question }}</label>
              </div>
            </div>
            <div class="clearfix"></div>
            <!-- Display widgets if any -->
            <template v-for="widget in row.widgets">

              <!-- Always show widgets when they don't have any  trigger_code-->
              <div v-if="!widget.trigger_code" :key="'w' + widget.id">
                <component 
                  :ref="'questionWidget' + widget.id" 
                  :is="widget.widget_name"
                  :project-id="id"
                  :key-id="row.id"
                  :value.sync="row.answer.answer"
                  :q-widget-id="widget.id">
                </component>
              </div>

              <div v-else :key="'w' + widget.id">
                <component v-show="show_widget"
                  :ref="'questionWidget' + widget.id" 
                  :is="widget.widget_name"
                  :project-id="id"
                  :key-id="row.id"
                  :value.sync="row.answer.answer"
                  :q-widget-id="widget.id">
                </component>
              </div>

            </template>

          </div>
        </template>
        
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],

  data() {
    return {
      questions: [],
      project_id: this.id,
      test_value: null,
      show_widget: false,
    }
  },

  created () {
    this.$EventDispatcher.listen('onBACallTabLoad', () => {
        this.getQuestions()
    })
  },

  components: {
    'target-group-widget': require('../../widgets/TargetGroupWidget.vue').default,
    'monetize-list-widget': require('../../widgets/MonetizeListWidget.vue').default,
  },

  methods: {
  	getQuestions () {

	  	this.$API.Helper.getQuestions(this.project_id, 'ba-call')
	        .then(res => {
	           this.questions = res.data
	        })
    },

    onWidgetTrigger (data) {

      this.show_widget = false

      if (data) {

        if (data.widget == 'target-group-widget') {
          /**
           * string.includes() is introduced in es6 and old browsers does not support it
           * to make it work, we can add a polyfill
           * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes 
           *
           */
           let value = data.value ? (data.value).toLowerCase().trim() : "";

          if (value.includes('customer')) {
            this.show_widget = true
          }

        }
      }

    }
  }
}
</script>