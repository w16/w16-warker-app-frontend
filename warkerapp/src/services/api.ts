
import axios, { Axios } from "axios";

const token =  '893|Tb85hHXbq17bITBYViFULwu6DsFOmhsacXKIs93l'

function api() {

    const instance = axios.create({
    baseURL: 'https://warker-api.herokuapp.com/api',
    headers: {'Authorization': 'Bearer '+token}
  });

  instance.get('/cidade')
  .then(response => {
    let data = response.data.data
      console.log(data);
      
      return response.data;
  })
}
export default api


