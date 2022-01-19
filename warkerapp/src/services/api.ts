
import axios, { Axios } from "axios";

const token =  '893|Tb85hHXbq17bITBYViFULwu6DsFOmhsacXKIs93l'

    const instance = axios.create({
    baseURL: 'https://warker-api.herokuapp.com/api',
    headers: {'Authorization': 'Bearer '+token}
  })

export default instance


