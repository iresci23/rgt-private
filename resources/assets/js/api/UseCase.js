import axios from 'axios'

export default {

  all (component_id) {

    return axios.get(route('UseCase.all', { component_id: component_id }))
  },

  add(data) {
    return axios.post(route('UseCase.store'), data)
  },

  sort(id, data) {
    return axios.post(route('UseCase.sort', id), data)
  },

  delete(id) {
    return axios.delete(route('UseCase.delete', id))
  },

  duplicate(data) {
    return axios.post(route('UseCase.duplicate'), data)
  },

  update(id, data) {
    return axios.post(route('UseCase.update', id), data)
  }
}