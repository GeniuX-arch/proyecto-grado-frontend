import axios from 'axios';

axios.get('http://192.168.0.8/sanctum/csrf-cookie', { withCredentials: true })
  .then(() => {
    axios.post('http://192.168.0.8/login', {
      email: 'user@example.com',
      password: 'password'
    }, { withCredentials: true })
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.error('Error during login:', error.response.data.message);
    });
  });


axios.get('http://192.168.0.8/api/protected-route', { withCredentials: true })
  .then(response => {
    console.log('Protected data:', response.data);
  })
  .catch(error => {
    console.error('Error accessing protected route:', error.response.data.message);
  });


axios.post('http://192.168.0.8/logout', {}, { withCredentials: true })
  .then(response => {
    console.log(response.data.message);
  })
  .catch(error => {
    console.error('Error during logout:', error.response.data.message);
  });
