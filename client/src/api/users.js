import axios from 'axios';

const usersApi = axios.create(
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
)

const registerUser = async (user) => {
  try {
    const body = JSON.stringify(user);
    return await usersApi.post('/api/users', body);
  } catch (err) {
    
  }
}

const loginUser = async (user) => {
  try {
    const body = JSON.stringify(user);
    return await usersApi.post('/api/auth', body);
  } catch (err) {
    
  }
}

export { registerUser, loginUser };