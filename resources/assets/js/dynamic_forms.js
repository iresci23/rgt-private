// Text input field component
const textInput = {

  props: {
    keyId: { required: true },
    label: { required: true },
    value: { required: true },
    placeholder: { required: false },
    autoSave: { required: false, default: true }
  },

  data() {

    return {
      getLabel: this.label,
      getValue: this.value,
    }
  },

  created() {

      this.debounceFn = _.debounce( () => {

        if ( this.autoSave ) {
          this.$EventDispatcher.fire('onAutoSave', {
            key: this.keyId,
            label: this.getLabel,
            value: this.getValue,
            layout: 'text-input'
          });
        }
  
      }, 1000)

  },

  watch: {

    getValue: function (newv, oldv) {
      if ( oldv !== null ) {
        this.debounceFn()
      }
    }
    
  },

  methods: {
  },
  
  template: `
  <div class="form-group">
    <label class="text-label">{{ getLabel }}</label>
    <ui-textbox v-model="getValue" :placeholder="placeholder"></ui-textbox>
  </div>
  `
};

// Text input field component
const textArea = {
  props: {
    keyId: { required: true },
    label: { required: true },
    value: { required: true },
    placeholder: { required: false },
    autoSave: { required: false, default: true }
  },

  data() {
    return {
      getLabel: this.label,
      getValue: this.value,
    }
  },

  created() {
    this.debounceFn = _.debounce( () => {
      this.$EventDispatcher.fire('onAutoSave', {
        key: this.keyId,
        label: this.getLabel,
        value: this.getValue,
        layout: 'text-area'
      })
    }, 1000)
  },

  watch: {
    getValue: function (newv, oldv) {
      if ( oldv !== null ) {
        this.debounceFn()
      }
    }
  },
  
  template: `
  <div class="form-group">
    <label class="text-label">{{ getLabel }}</label>
    <ui-textbox :multi-line="true" v-model="getValue" :placeholder="placeholder"></ui-textbox>
  </div>
  `
};

// Select input field component
const selection = {

  props: {
    keyId: { required: true },
    label: { required: true },
    value: { required: true },
    row: { type: Object,  required: false },
    placeholder: { required: false },
    autoSave: { required: false, default: true },
    customClass: { required: false, default: 'col-md-4' }
  },

  data() {
    return {
      getLabel: this.label,
      getValue: this.value || '',
      getOptions: this.row ? this.row.options : [],
      getClass: this.customClass || ''
    }
  },

  created() {

    this.debounceFn = _.debounce( () => {

      this.$EventDispatcher.fire('onAutoSave', {
        key: this.keyId,
        label: this.getLabel,
        value: this.getValue,
        layout: 'selection'
      });

    }, 1000)
  },

  mounted() {
    this.fireTriggerWidget()
  },

  watch: {

    getValue: function (newv, oldv) {

      if ( oldv !== null ) {

        this.debounceFn()
        this.fireTriggerWidget()

      }
    }
    
  },

  methods: {
    fireTriggerWidget: function () {
        // if this row has widget to trigger, emit the event
        if ( this.row.trigger_widget ) {
          this.$emit('triggerwidget', {
            key: this.keyId,
            value: this.getValue,
            widget: this.row.trigger_widget
          })
        }
    }
  },

  template: `
  <div class="form-group">
    <label class="text-label">{{ getLabel }}</label>
    <div class="row col-sm-12" :class="getClass">
      <ui-select
          :options="getOptions"
          v-model="getValue"
          :placeholder="placeholder"
      ></ui-select>
    </div>
  </div>
  `
};

const radioGroup = {

  props: {
    keyId: { required: true },
    label: { required: true },
    value: { required: true },
    row: { type: Object,  required: false },
    placeholder: { required: false },
    name: { required: false },
    autoSave: { required: false, default: true }
  },

  data() {
    return {
      getLabel: this.label,
      getName: this.name || 'group-' + Math.random().toString(36).substring(7),
      getValue: this.value || '',
      getOptions: this.row ? this.row.options : []
    }
  },

  created() {

    this.debounceFn = _.debounce( () => {

      this.$EventDispatcher.fire('onAutoSave', {
        key: this.keyId,
        name: this.getName,
        label: this.getLabel,
        value: this.getValue,
        layout: 'radio-group'
      });

    }, 1000)
  },

  mounted() {
    this.fireTriggerWidget()
  },

  watch: {

    getValue: function (newv, oldv) {

      if ( oldv !== null ) {

        this.debounceFn()
        this.fireTriggerWidget()

      }
    }
    
  },

  methods: {
    fireTriggerWidget: function () {
        // if this row has widget to trigger, emit the event
        if ( this.row.trigger_widget ) {
          this.$emit('triggerwidget', {
            key: this.keyId,
            value: this.getValue,
            widget: this.row.trigger_widget
          })
        }
    }
  },

  template: `
  <div class="form-group">
    <label class="text-label">{{ getLabel }}</label>
    <ui-radio-group
      vertical
      name="getName"
      :options="getOptions"
      v-model="getValue"
      class="col-sm-12"
    >
    </ui-radio-group>
  </div>
  `
};


const checkGroup = {

  props: {
    keyId: { required: true },
    label: { required: true },
    value: { required: true, default: [] },
    row: { type: Object,  required: false }, //row.options is required
    autoSave: { required: false, default: true }
  },

  data() {

    let json_parsed = []
       
    try {
        json_parsed = this.value ? JSON.parse(this.value) : []
    } catch(e) {
        json_parsed = []
    }

    return {
      getLabel: this.label,
      getValue: json_parsed && Array.isArray(json_parsed.checked_items) ? json_parsed.checked_items : [],
      getOptions: this.row ? this.row.options : []
    }
  },

  created() {

    this.debounceFn = _.debounce( () => {

      let json_string = JSON.stringify({
        checked_items: this.getValue
      });

      this.$EventDispatcher.fire('onAutoSave', {
        key: this.keyId,
        label: this.getLabel,
        value: json_string,
        layout: 'check-group'
      });

    }, 1000)
  },

  mounted() {
    this.fireTriggerWidget()
  },

  watch: {

    getValue: function (newv, oldv) {

      if ( oldv !== null ) {

        this.debounceFn()
        this.fireTriggerWidget()

      }
    }
    
  },

  methods: {
    fireTriggerWidget: function () {
        // if this row has widget to trigger, emit the event
        if ( this.row.trigger_widget ) {

          let json_string = JSON.stringify({
            checked_items: this.getValue
          });

          this.$emit('triggerwidget', {
            key: this.keyId,
            value: json_string,
            widget: this.row.trigger_widget
          })
        }
    }
  },

  template: `
  <div class="form-group indent">
    <label class="text-label">{{ getLabel }}</label>
    <ui-checkbox-group
        vertical
        :options="getOptions"
        v-model="getValue"
    ></ui-checkbox-group>
  </div>
  `
};

export default {
    textInput,
    textArea,
    selection,
    radioGroup,
    checkGroup
}
