import axios from 'axios'

export default {


    update(id, data) {

        return axios.post(route('Question.update', id), data)
    },

    delete(id) {
        return axios.delete(route('Question.delete', id))
    },

    duplicate(data) {
        return axios.post(route('Question.duplicate'), data)
    },

    add(data) {
      return axios.post(route('Question.store'), data)
    },

}