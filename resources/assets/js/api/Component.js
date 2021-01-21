import axios from 'axios'

export default {

  all (project_id, include) {

    return axios.get(route('Component.all', { 
        project_id: project_id,
        include: include || ''
    }))
  },

  sort(id, sort_order) {
    return axios.post(route('Component.sort', id), {
      sort_order: sort_order
    })
  },

  add(data) {
    return axios.post(route('Component.store'), data)
  },

  delete(id) {
    return axios.delete(route('Component.delete', id))
  },

  duplicate(data) {
    return axios.post(route('Component.duplicate'), data)
  },

  update(id, data) {
    return axios.post(route('Component.update', id), data)
  }

}