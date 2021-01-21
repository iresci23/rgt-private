<template>
  <div class="sales-call">
    <div class="row">
        <div class="col-sm-12 col-md-8">
          <ui-progress-circular color="multi-color" v-if="questions && !questions.length"></ui-progress-circular>
          <template v-for="row in questions">
              <div class="dynamic-form" :key="row.id"  v-if="row.trigger_widget != 'field_other_note'">
                <!-- Show the regular fields in first column -->
                <component 
                  :ref="'questionRow' + row.id" 
                  :is="row.layout" :label="row.question" 
                  :key-id="row.id" :value.sync="row.answer.answer"
                  :row="row">
                </component>
              </div>
          </template>
        </div>
        <div class="col-sm-12 col-md-4" v-if="other_note_field">
          <!-- Show the "Other Notes" field in second column -->
          <div class="dynamic-form" :key="other_note_field.id">
            <component 
              :ref="'questionRow' + other_note_field.id" 
              :is="other_note_field.layout" :label="other_note_field.question" 
              :key-id="other_note_field.id" :value.sync="other_note_field.answer.answer"
              placeholder="Add other notes here">
            </component>
          </div>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['id'],

  data() {
    return {
      questions: [],
      answers: [],
      project_id: this.id,
      other_note_field: null
    }
  },

  mounted () {

    if ( route().current('Project.sales') ) {  this.getQuestions()  }

    this.$EventDispatcher.listen('onSalesTabLoad', () => { 
        if ( route().current('Project.sales') ) {  
            this.getQuestions()  
        } else {
            location.href = route('Project.sales', this.project_id)
        }
    })

    this.$EventDispatcher.listen('onSalesTabLoad', (data) => {
      this.getQuestions()
    })

    this.$EventDispatcher.listen('onAutoSave', (data) => {
      this.saveAnswer(data)
    })

  },

  methods: {
  	getQuestions () {

	  	this.$API.Helper.getQuestions(this.project_id, 'sales-call')
	        .then(res => {
             this.questions = res.data
             this.other_note_field = _.find(res.data, { 'trigger_widget': 'field_other_note' });
	        })
  	},

    saveAnswer (data) {
      this.$notify.message('Saving...')

      this.$API.Helper.saveAnswer(this.project_id, data)
      .then(res => {
         this.$notify.success('All changes are saved!')
      })
    }

  }
}
</script>