import Vue from 'vue'

export default class Notify{
	constructor(){

		this.vue = new Vue({
			el: '#vue-app-notices',
			components: {
				'auto-save-indicator': require('../components/helpers/AutoSaveIndicator.vue').default
			}
		})

		this.indicator = this.vue.$refs.autoSaveIndicator;
	}
	message(message) {
		this.indicator.message(message);
	}
	success(message) {
		this.indicator.success(message);
	}
	error(message) {
		this.indicator.error(message);
	}
	errors(errors) {
		this.indicator.error(
			errors.join(", ")
		)
	}
	clear() {
		this.indicator.clear();
	}
	responseError(resp) {
		if ( resp && resp.data ) {
			let errors = resp.data.errors
			let errorBag = []

			Object.keys(errors).forEach(key => {
				errorBag.push(errors[key])
			})

			this.indicator.error(
				errorBag.join(", ")
			)
		}
	}
}