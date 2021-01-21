import axios from 'axios'

export default {
  
  all () {
    
    return axios.get(route('Client.all'))

  }

}