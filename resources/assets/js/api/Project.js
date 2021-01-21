import axios from 'axios'

export default {

  all (params) {

    return axios.get(route('Project.all', params))
  },

  getTargetGroups (project_id, qwidget_id) {

    return axios.get(route('Sales.TargetGroup.all', { id: project_id, qwidget_id: qwidget_id }))
  },
  
  saveTargetGroup (data) {
    
    return axios.post(route('Sales.TargetGroup.save', data.project_id ), data)

  },
  
  getTypes () {
    
    return axios.get(route('Project.Types'))

  },

  get (id) {
    return axios.get(route('Project.get', { id: id }))
  },

  save (data) {
    return axios.post(route('Project.save'), data)
  },

  saveRates (id, data) {
    return axios.post(route('Project.saveRates'), {
      id: id,
      rates: data
    })
  }

}