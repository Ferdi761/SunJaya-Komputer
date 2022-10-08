import { AuthProvider } from 'react-admin'

const authProvider: AuthProvider = {
  login: ({ username }) => {
    localStorage.setItem('username', username)
    return Promise.resolve()
  },
  logout: () => {
    localStorage.removeItem('username')
    return Promise.resolve()
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username')
      return Promise.reject()
    } else return Promise.resolve()
  },
  checkAuth: () => {
    return localStorage.getItem('username')
      ? Promise.resolve()
      : Promise.reject()
  },
  getPermissions: () => Promise.resolve(),
}

export default authProvider
