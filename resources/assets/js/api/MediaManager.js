import axios from 'axios'

export default {

  saveDirectory(data) {

    return axios.post(route('MediaManager.saveDirectory'), data)
  },

  delete(data) {
    
    return axios.delete(route('MediaManager.delete'), {
    	params: data
    })
  },

  getFilesByProject(project_id, path, is_dir) {

    return axios.get(route('MediaManager.byProject', { 
    	project_id: project_id, 
    	path: path ? path : '',
    	is_dir: is_dir
    }))

  },

  upload(data) {

  	return  axios.post(route('MediaManager.store'), data, {
	            headers: {
	                'content-type': 'multipart/form-data'
	            }
	        })
  },

  uploadMultiple(data) {

  	return  axios.post(route('MediaManager.storeMultiple'), data, {
	            headers: {
	                'content-type': 'multipart/form-data'
	            }
	        })
  },

  update(data) {
  	
    return axios.post(route('MediaManager.update'), data)
  },

}