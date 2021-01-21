<template>
    <div class="col-sm-12 widget monetize-list-widget">
          <div class="col-sm-12">
            <div class="checkbox-group col-sm-12">
                <template v-for="(check, index) in options">
                    <div class="row" :key="index">
                        <div class="form-group" :key="'mcheckbox' + index">
                            <ui-checkbox name="monetize" v-model="checked_items[index]" :true-value="check.label">{{ check.label }}</ui-checkbox>
                            <!-- Radio options, show only when parent checkbox is checked -->
                            <template v-if="check.radio_options && check.radio_options.length">

                                <div class="col-sm-12" :key="'mradio' + index"  v-show="checked_items[index]">
                                    <ui-radio-group
                                        vertical
                                        :name="check.radio_field"
                                        :options="check.radio_options"
                                        v-model="selected_radio[check.radio_field]"
                                    >
                                    </ui-radio-group>
                                </div>

                            </template>
                        </div>
                    </div>
                </template>

                <template v-if="customlist && customlist.length">
                    <div class="row">
                        <div v-for="(item,index) in customlist"  class="form-group" :key="'mcustom' + index">
                            <ui-checkbox 
                                name="monetize" v-model="customlist[index]" :true-value="item"
                                @change="onCustomChange">
                                {{ item }}
                            </ui-checkbox>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="bottom-quick-add-input col-sm-12" v-if="custominput">
            <div class="flex">
                <ui-textbox placeholder="Others" v-model="custominput"  @keydown-enter="add()" :autofocus="true"></ui-textbox>
                <div>
                    <a href="javascript:;" @click.stop="add(true)" class="btn-plus"><span class="material-icons"> + </span></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        props: {
           projectId: { required: true },
           keyId: { required: true },
           value: { required: true, default: '' }
        },

        data() {

            let json_parsed = []
            
            try {
                json_parsed = this.value ? JSON.parse(this.value) : []
            } catch(e) {
                json_parsed = []
            }

            return {
                options: [
                    { label: 'Ad revenue', value: 'Ad revenue', radio_options: [] },
                    { label: 'Subscription fee', value: 'Subscription fee', radio_field: 'subscription_radio',
                        radio_options: ['Monthly', 'Annual', 'Both monthly and annual'] 
                    },
                    { label: 'One-time fee', value: 'One-time fee', radio_options: [] },
                    { label: 'Fee per transaction', value: 'Fee per transactione', radio_options: [] },
                ],
                /* Structure to handle dynamic radio v-model binding */
                selected_radio: {
                    subscription_radio: json_parsed ? json_parsed.selected_radio.subscription_radio : '',
                    // fee_radio: json_parsed ? json_parsed.selected_radio.fee_radio : '',
                },
                /* Holder of selected check items */
                checked_items: json_parsed && json_parsed.checked_items ? json_parsed.checked_items : [],
                /* On the fly adding of check items */
                customlist:  json_parsed && json_parsed.customlist ? json_parsed.customlist : [],
                custominput: '',

            };
        },

        watch: {
            'checked_items': function (newv, oldv) {
                this.save()
            },
            'selected_radio.subscription_radio': function (newv, oldv) {
                if ( oldv !== null && !_.isEqual(newv, oldv)  ) {
                 this.save()
                }
            }
        },

        methods: {


            add (validate) {

                if ( !this.custominput && validate ) {
                    this.$notify.error("Input value is required")
                    return;
                } else if ( !this.custominput ) {
                    return;
                }

                /* push to render */
                this.customlist.push(this.custominput)

                /* clear input box */
                this.custominput = ''

                this.save()
            },

            onCustomChange(value) {

                if ( !value ) { //if unchecked, remove from list
                    this.customlist = _.compact(this.customlist) //removes empty, false, null, undefined
                    this.save()
                }
            },

            save () {

                let json_string = JSON.stringify({
                    checked_items: this.checked_items,
                    selected_radio: this.selected_radio,
                    customlist: this.customlist
                });

                let data = {
                    key: this.keyId,
                    value: json_string,
                    layout: 'monetize-list-widget'
                };

                this.$notify.message('Saving...')

                this.$API.Helper.saveAnswer(this.projectId, data)
                  .then(res => {

                    this.$notify.success('Saved!')
                    
                  })

            }
        }
    }
</script>