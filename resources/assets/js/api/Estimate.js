import axios from 'axios'

export default {

    save(data) {
        return axios.post(route('Estimate.save'), data)
    },

    getTimeAndCost(project_id) {
        return axios.get(route('Estimate.timeAndCost', {
            project_id: project_id
        }))
    },

    saveTimeAndCost(project_id, data) {
        return axios.post(route('Estimate.saveTimeAndCost'), {
            project_id: project_id,
            item: data
        })
    },

    resetTimeAndCost(project_id) {
        /** it resets the values by removing the data from table */
        return axios.delete(route('Estimate.resetTimeAndCost'), {
            params: {
                project_id: project_id
            }
        })
    }

}