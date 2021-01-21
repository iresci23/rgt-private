import axios from 'axios'

export default {

  deleteRows(slug, ids) {

    return axios.delete(`/app/${slug}`, {
    	params: { ids: ids }
    })

  },

  archiveRows(slug, ids) {

    return axios.post(`/app/${slug}/archive`, { ids: ids })

  },

  restoreRow(slug, id, state) {

    return axios.patch(`/app/${slug}/${id}/restore`, {state: state })
  },

  getQuestions(project_id, section) {

    return axios.get(route('Question.all', { project_id: project_id, section: section }))
  },

  saveAnswer (project_id, data) {

    data.project_id = project_id;

    return axios.post(route('Answer.save'), data)
  },

  saveSort(list, model) {
    return axios.post(route('Helper.sort'), {
      list: list,
      model: model
    })
  }

}