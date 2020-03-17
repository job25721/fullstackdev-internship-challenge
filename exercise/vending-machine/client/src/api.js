import axios from 'axios'

export default axios.create({
    baseURL : 'https://us-central1-vending-machine-86eda.cloudfunctions.net/app',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})